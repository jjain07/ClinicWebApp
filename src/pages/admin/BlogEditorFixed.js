import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  uploadBlogImage,
  deleteBlogImage,
  createBlog,
  putUpdateBlog,
  getAllProcedures,
  getProcedureBlog,
  deleteBlog,
} from "../../services/dbservice";

import { convertToTree } from "../../services/utility";
import MenuItem from "../../component/MenuItem";

/* ---------- helpers ---------- */

// Some content was saved with HTML entities escaped one or more times
// (e.g. `&lt;p&gt;...`, or `&amp;lt;p&amp;gt;...`). Decode iteratively
// until no more entity-escaped tags remain.
const decodeIfEscaped = (html) => {
  if (!html || typeof html !== "string") return "";
  let out = html;
  let safety = 5;
  while (safety-- > 0 && /&(amp;)*lt;\s*[a-zA-Z/]/i.test(out)) {
    try {
      const txt = document.createElement("textarea");
      txt.innerHTML = out;
      const decoded = txt.value;
      if (decoded === out) break;
      out = decoded;
    } catch {
      break;
    }
  }
  return out;
};

// Parse <img src="..."> URLs from an HTML string.
const extractImageUrls = (html) => {
  if (!html) return [];
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return Array.from(doc.querySelectorAll("img"))
      .map((img) => img.getAttribute("src"))
      .filter(Boolean);
  } catch {
    return [];
  }
};

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

/* ---------- component ---------- */

const BlogEditor = () => {
  const quillRef = useRef(null);
  const selectedRef = useRef(null);
  const prevImagesRef = useRef([]); // images currently in the editor; updated on every change/load

  const [editorContent, setEditorContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [title, setTitle] = useState("");

  const [procedures, setProcedures] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [blog, setBlog] = useState(null); // currently loaded blog object (or null = new)

  const [selected, setSelected] = useState(null); // currently selected procedureId
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /* keep selectedRef in sync so the (memoized) image handler can read it */
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  /* ---------- image handlers (stable callbacks via refs) ---------- */

  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files && input.files[0];
      if (!file) return; // user cancelled

      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        alert("Unsupported image type. Please choose JPG, PNG, GIF, or WebP.");
        return;
      }
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        alert("Image is too large. Maximum size is 5 MB.");
        return;
      }

      const procedureId = selectedRef.current;
      if (!procedureId) {
        alert("Please select a procedure before uploading images.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("procedureId", String(procedureId));

      try {
        const res = await uploadBlogImage(formData);
        const url = res && res.data && res.data.url;
        if (!url) {
          alert("Upload succeeded but no image URL was returned.");
          return;
        }

        const quill = quillRef.current && quillRef.current.getEditor();
        if (!quill) return;
        const range = quill.getSelection(true);
        const insertAt =
          range && typeof range.index === "number" ? range.index : quill.getLength();

        // Use Quill's proper API so undo/history & formatting stay intact
        quill.insertEmbed(insertAt, "image", url, "user");
        quill.setSelection(insertAt + 1, 0, "user");

        // Track the newly inserted image so we don't accidentally delete it later
        prevImagesRef.current = [...prevImagesRef.current, url];
      } catch (err) {
        console.error("Image upload failed:", err);
        alert("Image upload failed. Please try again.");
      }
    };
  }, []);

  const handleVideoInsert = useCallback(() => {
    const url = window.prompt("Enter video URL (YouTube, Vimeo, etc):");
    if (!url) return;
    // simple sanity check
    if (!/^https?:\/\//i.test(url)) {
      alert("Please enter a valid http(s) URL.");
      return;
    }
    const quill = quillRef.current && quillRef.current.getEditor();
    if (!quill) return;
    const range = quill.getSelection(true);
    const insertAt =
      range && typeof range.index === "number" ? range.index : quill.getLength();
    quill.insertEmbed(insertAt, "video", url, "user");
    quill.setSelection(insertAt + 1, 0, "user");
  }, []);

  /* Quill toolbar modules - stable across renders so the editor never re-initializes */
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          [{ color: [] }, { background: [] }],
          [{ size: ["extra-small", "small", false, "large", "extra-large", "huge"] }],
          ["bold", "italic", "underline"],
          ["link", "image", "video"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
        handlers: {
          image: handleImageUpload,
          video: handleVideoInsert,
        },
      },
    }),
    [handleImageUpload, handleVideoInsert]
  );

  /* ---------- load procedures once ---------- */

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllProcedures();
        const data = Array.isArray(res?.data) ? res.data : [];
        setProcedures(data);
        setTreeData(convertToTree(data));
      } catch (err) {
        console.error("Failed to fetch procedures:", err);
      }
    })();
  }, []);

  /* ---------- editor change ---------- */

  const handleEditorChange = (content, _delta, _source, editor) => {
    // Determine which images are currently in the editor
    const newImages = extractImageUrls(content);
    const oldImages = prevImagesRef.current || [];

    // Delete only images that were *removed in this change* (intersection logic).
    // Important: we DO NOT delete images on blog switches, because we reset
    // `prevImagesRef` in `getSelectedBlog` before the editor value changes.
    const deleted = oldImages.filter((img) => !newImages.includes(img));
    if (deleted.length > 0) {
      (async () => {
        for (const imgUrl of deleted) {
          try {
            const fileName = imgUrl.split("/").pop();
            if (fileName) await deleteBlogImage(fileName);
          } catch (err) {
            console.error("Failed to delete image:", imgUrl, err);
          }
        }
      })();
    }

    prevImagesRef.current = newImages;
    setEditorContent(content || "");
    setHtmlContent(editor.getHTML());
  };

  /* ---------- sidebar selection / load blog ---------- */

  const getSelectedBlog = async (item) => {
    if (!item) return;
    try {
      setSelected(item.id);
      const res = await getProcedureBlog(item.id);

      // The API may return either an object or an array of blogs
      let data = res?.data ?? null;
      if (Array.isArray(data)) data = data.length > 0 ? data[0] : null;

      if (!data || data.id === 0) {
        // No existing blog for this procedure - reset to "new"
        prevImagesRef.current = [];
        setBlog(null);
        setTitle("");
        setEditorContent("");
        setHtmlContent("");
      } else {
        // Decode any entity-escaped HTML stored previously
        const decoded = decodeIfEscaped(data.htmlContent || "");
        // Reset tracked images BEFORE pushing new content into the editor,
        // so the change handler doesn't think the previous blog's images
        // were just deleted.
        prevImagesRef.current = extractImageUrls(decoded);
        setBlog({ data });
        setTitle(data.title || "");
        setEditorContent(decoded);
        setHtmlContent(decoded);
      }
    } catch (err) {
      console.error("Failed to fetch blog:", err);
      alert("Failed to load blog for the selected procedure.");
    }
  };

  /* ---------- save ---------- */

  const handleSave = async () => {
    if (!selected) {
      alert("Please select a procedure first.");
      return;
    }
    if (!title.trim()) {
      alert("Please enter a blog title.");
      return;
    }
    setSaving(true);
    try {
      const existingId = blog && blog.data && blog.data.id;
      if (existingId) {
        await putUpdateBlog(existingId, {
          id: existingId,
          title,
          htmlContent,
          ProcedureId: selected,
        });
      } else {
        await createBlog({ title, htmlContent, ProcedureId: selected });
      }
      alert("Blog saved!");
      // Refresh loaded blog (so subsequent saves go through the update path)
      try {
        const refresh = await getProcedureBlog(selected);
        let data = refresh?.data ?? null;
        if (Array.isArray(data)) data = data.length > 0 ? data[0] : null;
        if (data) setBlog({ data });
      } catch {
        /* non-fatal */
      }
    } catch (err) {
      console.error("Failed to save blog:", err);
      alert("Failed to save blog. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  /* ---------- delete ---------- */

  const handleDelete = async () => {
    const existingId = blog && blog.data && blog.data.id;
    if (!existingId) {
      alert("There is no saved blog to delete.");
      return;
    }
    const ok = window.confirm(
      "Delete this blog? This will also remove its uploaded images. This action cannot be undone."
    );
    if (!ok) return;

    setDeleting(true);
    try {
      // Best-effort cleanup of images referenced in the blog HTML
      const imageUrls = extractImageUrls(blog.data.htmlContent || htmlContent || "");
      for (const url of imageUrls) {
        try {
          const fileName = url.split("/").pop();
          if (fileName) await deleteBlogImage(fileName);
        } catch (err) {
          console.error("Failed to delete image while deleting blog:", url, err);
        }
      }

      await deleteBlog(existingId);

      // Reset editor state to a fresh "new blog" for the same procedure
      prevImagesRef.current = [];
      setBlog(null);
      setTitle("");
      setEditorContent("");
      setHtmlContent("");
      alert("Blog deleted.");
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("Failed to delete blog. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  /* ---------- render ---------- */

  return (
    <div className="p-4 sm:p-6 bg-[#FDF3C4] min-h-screen">
      <div className="container mx-auto">
        <div className="h-16 md:h-40" />
        <div className="min-h-screen bg-[#FDF3C4] flex flex-col md:flex-row gap-4 md:gap-0">
          {/* Sidebar */}
          <aside
            className={`md:w-1/4 w-full bg-white shadow-lg border-r-2 border-[#b8860b] p-4 sm:p-6 rounded-lg md:rounded-none transition-all duration-300 ${
              isSidebarOpen ? "max-h-96 md:max-h-full overflow-y-auto" : "max-h-16 md:max-h-full"
            }`}
          >
            <div className="p-2 sm:p-4 flex justify-between items-center h-14 md:h-16 border-b border-[#b8860b]">
              <h1
                className={`text-lg sm:text-xl font-bold text-[#800000] truncate transition-all ${
                  !isSidebarOpen && "hidden md:block"
                }`}
              >
                Procedures
              </h1>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden w-8 h-8 flex items-center justify-center rounded transition font-semibold bg-[#b8860b] text-white hover:bg-[#a07609]"
                aria-label="Toggle sidebar"
              >
                {isSidebarOpen ? "−" : "+"}
              </button>
            </div>

            {(isSidebarOpen || (typeof window !== "undefined" && window.innerWidth >= 768)) && (
              <ul className="space-y-1 mt-3 sm:mt-4">
                {treeData.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onClick={(childItem) => getSelectedBlog(childItem)}
                  />
                ))}
              </ul>
            )}
          </aside>

          {/* Main */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 w-full">
            <div className="max-w-4xl md:max-w-8xl text-base sm:text-lg bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#800000] mb-4 md:mb-6 text-center">
                {blog && blog.data ? "Edit Blog" : "Add Blog"}
              </h2>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                className="w-full mb-4 px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#b8860b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
              />

              <div className="mb-4 md:mb-6">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={editorContent}
                  onChange={handleEditorChange}
                  modules={modules}
                  className="bg-white rounded-lg"
                  style={{ minHeight: "250px" }}
                />
              </div>

              <textarea
                value={htmlContent}
                readOnly
                style={{ width: "100%", minHeight: "150px" }}
                className="border border-[#b8860b] rounded-lg p-2 sm:p-3 bg-[#fff8f0] mb-4 text-xs sm:text-sm"
              />

              <div className="flex flex-col md:flex-row gap-3 mt-4">
                <button
                  onClick={handleSave}
                  disabled={saving || deleting}
                  className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition text-sm sm:text-base"
                >
                  {saving ? "Saving…" : blog && blog.data ? "Update Blog" : "Save Blog"}
                </button>
                {blog && blog.data && blog.data.id ? (
                  <button
                    onClick={handleDelete}
                    disabled={saving || deleting}
                    className="w-full md:w-auto bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition text-sm sm:text-base"
                  >
                    {deleting ? "Deleting…" : "Delete Blog"}
                  </button>
                ) : null}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
