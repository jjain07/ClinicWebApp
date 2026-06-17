import React, { useEffect, useRef, useState } from "react";
import {
  getAllGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  uploadGalleryImage,
  getAllProcedures,
} from "../../services/dbservice";

const emptyForm = {
  id: null,
  title: "",
  procedureId: "",
  beforeImageUrl: "",
  afterImageUrl: "",
};

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);
  const [saving, setSaving] = useState(false);

  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);

  const loadAll = async () => {
    try {
      const res = await getAllGallery();
      setItems(res.data || []);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  };

  useEffect(() => {
    loadAll();
    (async () => {
      try {
        const res = await getAllProcedures();
        setProcedures(res.data || []);
      } catch (err) {
        console.error("Failed to fetch procedures:", err);
      }
    })();
  }, []);

  const handleFile = async (e, kind) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("kind", kind); // "before" | "after"
    if (form.procedureId) fd.append("procedureId", form.procedureId);

    try {
      kind === "before" ? setUploadingBefore(true) : setUploadingAfter(true);
      const res = await uploadGalleryImage(fd);
      const url = res?.data?.url;
      if (!url) throw new Error("No URL returned from upload");
      setForm((prev) => ({
        ...prev,
        [kind === "before" ? "beforeImageUrl" : "afterImageUrl"]: url,
      }));
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      kind === "before" ? setUploadingBefore(false) : setUploadingAfter(false);
      // Reset the input so the same file can be selected again
      if (kind === "before" && beforeInputRef.current) beforeInputRef.current.value = "";
      if (kind === "after" && afterInputRef.current) afterInputRef.current.value = "";
    }
  };

  const resetForm = () => setForm(emptyForm);

  const editItem = (item) => {
    setForm({
      id: item.id,
      title: item.title || "",
      procedureId: item.procedureId || "",
      beforeImageUrl: item.beforeImageUrl || "",
      afterImageUrl: item.afterImageUrl || "",
    });
  };

  const handleSave = async () => {
    if (!form.beforeImageUrl || !form.afterImageUrl) {
      alert("Please upload both Before and After images.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        procedureId: form.procedureId || null,
        beforeImageUrl: form.beforeImageUrl,
        afterImageUrl: form.afterImageUrl,
      };
      if (form.id) {
        await updateGalleryItem(form.id, { id: form.id, ...payload });
      } else {
        await createGalleryItem(payload);
      }
      await loadAll();
      resetForm();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save gallery item.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gallery item?")) return;
    try {
      await deleteGalleryItem(id);
      await loadAll();
      if (form.id === id) resetForm();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete gallery item.");
    }
  };

  return (
    <div className="p-6 bg-[#FDF3C4] min-h-screen">
      <div className="container mx-auto">
        <div className="h-24 md:h-32" />
        <h2 className="text-2xl font-bold text-[#800000] mb-6 text-center">
          Manage Gallery (Before / After)
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Form */}
          <section className="md:w-1/2 w-full bg-white rounded-2xl shadow p-6 border border-[#b8860b]">
            <h3 className="text-lg font-bold text-[#800000] mb-4">
              {form.id ? "Update Gallery Item" : "Add New Gallery Item"}
            </h3>

            <label className="block text-[#800000] font-semibold mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., Smile Makeover - Case 1"
              className="w-full mb-4 px-4 py-2 border border-[#b8860b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            />

            <label className="block text-[#800000] font-semibold mb-1">Procedure</label>
            <select
              value={form.procedureId}
              onChange={(e) => setForm({ ...form, procedureId: e.target.value })}
              className="w-full mb-4 px-4 py-2 border border-[#b8860b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            >
              <option value="">-- Select Procedure --</option>
              {procedures.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.procedureName}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Before */}
              <div>
                <label className="block text-[#800000] font-semibold mb-1">
                  Before Image
                </label>
                <input
                  ref={beforeInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e, "before")}
                  className="w-full text-sm"
                />
                {uploadingBefore && (
                  <p className="text-sm text-gray-600 mt-1">Uploading…</p>
                )}
                {form.beforeImageUrl && (
                  <img
                    src={form.beforeImageUrl}
                    alt="Before preview"
                    className="mt-2 w-full h-40 object-cover rounded border"
                  />
                )}
              </div>

              {/* After */}
              <div>
                <label className="block text-[#800000] font-semibold mb-1">
                  After Image
                </label>
                <input
                  ref={afterInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e, "after")}
                  className="w-full text-sm"
                />
                {uploadingAfter && (
                  <p className="text-sm text-gray-600 mt-1">Uploading…</p>
                )}
                {form.afterImageUrl && (
                  <img
                    src={form.afterImageUrl}
                    alt="After preview"
                    className="mt-2 w-full h-40 object-cover rounded border"
                  />
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#800000] text-white px-4 py-2 rounded hover:bg-[#a00000] disabled:opacity-60"
              >
                {saving ? "Saving…" : form.id ? "Update" : "Save"}
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-200 text-[#800000] px-4 py-2 rounded hover:bg-gray-300"
              >
                Clear
              </button>
            </div>
          </section>

          {/* List */}
          <section className="md:w-1/2 w-full bg-white rounded-2xl shadow p-6 border border-[#b8860b]">
            <h3 className="text-lg font-bold text-[#800000] mb-4">Existing Items</h3>
            {items.length === 0 ? (
              <p className="text-gray-600">No gallery items yet.</p>
            ) : (
              <ul className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {items.map((it) => (
                  <li
                    key={it.id}
                    className="border border-[#b8860b] rounded-lg p-3 flex gap-3"
                  >
                    <div className="flex gap-2">
                      {it.beforeImageUrl && (
                        <img
                          src={it.beforeImageUrl}
                          alt="Before"
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                      {it.afterImageUrl && (
                        <img
                          src={it.afterImageUrl}
                          alt="After"
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#800000]">
                        {it.title || "(Untitled)"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {procedures.find((p) => p.id === it.procedureId)
                          ?.procedureName || ""}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => editItem(it)}
                          className="text-sm bg-[#b8860b] text-white px-3 py-1 rounded hover:opacity-90"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(it.id)}
                          className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
