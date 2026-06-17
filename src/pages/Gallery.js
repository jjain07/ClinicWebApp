import React, { useEffect, useState } from "react";
import BeforeAfterSlider from "../component/BeforeAfterSlider";
import { getAllGallery, getAllProcedures } from "../services/dbservice";

// Sample/demo items shown when no gallery items exist in the database yet.
const SAMPLE_ITEMS = [
  {
    id: "sample-1",
    title: "Teeth Whitening - Case 1",
    procedureId: null,
    procedureName: "Teeth Whitening",
    beforeImageUrl:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    afterImageUrl:
      "https://images.unsplash.com/photo-1581585504852-86b14e3f4ed7?w=800&q=80",
  },
  {
    id: "sample-2",
    title: "Smile Makeover - Case 2",
    procedureId: null,
    procedureName: "Smile Makeover",
    beforeImageUrl:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    afterImageUrl:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&q=80",
  },
  {
    id: "sample-3",
    title: "Orthodontic Treatment",
    procedureId: null,
    procedureName: "Orthodontics",
    beforeImageUrl:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
    afterImageUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80",
  },
  {
    id: "sample-4",
    title: "Dental Implants",
    procedureId: null,
    procedureName: "Implants",
    beforeImageUrl:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80",
    afterImageUrl:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
  },
];

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [usingSamples, setUsingSamples] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [galleryRes, procRes] = await Promise.all([
          getAllGallery(),
          getAllProcedures(),
        ]);
        const data = galleryRes.data || [];
        if (data.length === 0) {
          setItems(SAMPLE_ITEMS);
          setUsingSamples(true);
        } else {
          setItems(data);
        }
        setProcedures(procRes.data || []);
      } catch (err) {
        console.error("Failed to load gallery:", err);
        // On error, still show the samples so the page is not empty.
        setItems(SAMPLE_ITEMS);
        setUsingSamples(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = filter
    ? items.filter((it) => String(it.procedureId) === String(filter))
    : items;

  return (
    <div className="p-6 bg-[#FDF3C4] min-h-screen">
      <div className="container mx-auto">
        <div className="h-24 md:h-32" />
        <h1 className="text-3xl md:text-4xl font-bold text-[#800000] text-center mb-3">
          Smile Gallery
        </h1>
        <p className="text-center text-[#5B1A13] mb-4">
          Drag the slider to see the transformation — before and after.
        </p>
        {usingSamples && (
          <p className="text-center text-sm text-[#5B1A13] italic mb-6">
            Showing sample images. Real cases will appear here once added from the
            admin panel.
          </p>
        )}

        {/* Filter by procedure (hidden for samples since they don't link to procedures) */}
        {!usingSamples && procedures.length > 0 && (
          <div className="flex justify-center mb-8">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-[#b8860b] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            >
              <option value="">All Procedures</option>
              {procedures.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.procedureName}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading ? (
          <p className="text-center text-[#800000]">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-[#800000]">No gallery items to display.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((it) => {
              const procName =
                it.procedureName ||
                procedures.find((p) => p.id === it.procedureId)?.procedureName ||
                "";
              return (
                <div
                  key={it.id}
                  className="bg-white rounded-2xl shadow-lg p-4 border border-[#b8860b]"
                >
                  <BeforeAfterSlider
                    before={it.beforeImageUrl}
                    after={it.afterImageUrl}
                    height={380}
                  />
                  <div className="mt-3">
                    <h3 className="text-lg font-bold text-[#800000]">
                      {it.title || "Case"}
                    </h3>
                    {procName && (
                      <p className="text-sm text-[#5B1A13]">{procName}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
