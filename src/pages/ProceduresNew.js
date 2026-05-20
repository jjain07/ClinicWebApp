import React, { useState, useEffect, useMemo } from "react";
import { getAllProcedures, getProcedureBlog } from "../services/dbservice";

/**
 * Some content was saved with HTML entities escaped one or more times
 * (e.g. `&lt;p&gt;...`, or even `&amp;lt;p&amp;gt;...`). Decode iteratively
 * until no more entity-escaped tags remain, or we hit a safety cap.
 */
const decodeIfEscaped = (html) => {
  if (!html || typeof html !== "string") return "";
  let out = html;
  let safety = 5;
  // Continue decoding while we still see escaped tag markers like
  // `&lt;p`, `&lt;/`, `&amp;lt;`, etc.
  while (safety-- > 0 && /&(amp;)*lt;\s*[a-zA-Z\/]/i.test(out)) {
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

/**
 * Minimal HTML sanitizer (no external dependency).
 * Removes <script>/<style>/<iframe> blocks, inline event handlers (onclick=...),
 * and javascript:/data:text URIs in href/src attributes.
 *
 * NOTE: For stronger protection, install `dompurify` and replace this with:
 *   import DOMPurify from "dompurify";
 *   return DOMPurify.sanitize(html);
 */
const sanitizeHtml = (html) => {
  if (!html || typeof html !== "string") return "";
  let out = html;
  // Strip dangerous blocks entirely
  out = out.replace(/<\s*script[\s\S]*?<\s*\/\s*script\s*>/gi, "");
  out = out.replace(/<\s*style[\s\S]*?<\s*\/\s*style\s*>/gi, "");
  out = out.replace(/<\s*iframe[\s\S]*?<\s*\/\s*iframe\s*>/gi, "");
  // Strip inline event handlers like onclick="..."
  out = out.replace(/\son\w+\s*=\s*"(?:[^"\\]|\\.)*"/gi, "");
  out = out.replace(/\son\w+\s*=\s*'(?:[^'\\]|\\.)*'/gi, "");
  out = out.replace(/\son\w+\s*=\s*[^\s>]+/gi, "");
  // Neutralize javascript: / data:text URIs
  out = out.replace(/(href|src)\s*=\s*"\s*javascript:[^"]*"/gi, '$1="#"');
  out = out.replace(/(href|src)\s*=\s*'\s*javascript:[^']*'/gi, "$1='#'");
  out = out.replace(/(href|src)\s*=\s*"\s*data:text\/[^"]*"/gi, '$1="#"');
  return out;
};

const ProceduresNew = () => {
  const [procedures, setProcedures] = useState([]);
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState(null); // { title, htmlContent } for the selected procedure
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [error, setError] = useState("");

  // Load procedures list once
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await getAllProcedures();
        const data = Array.isArray(res?.data) ? res.data : [];
        if (!isMounted) return;
        setProcedures(data);
        if (data.length > 0) setSelected(data[0].id);
      } catch (err) {
        console.error("Failed to fetch procedures:", err);
        if (isMounted) setError("Unable to load procedures. Please try again later.");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Load content for the selected procedure
  useEffect(() => {
    if (!selected) {
      setContent(null);
      return;
    }
    let isMounted = true;
    (async () => {
      setContentLoading(true);
      try {
        const res = await getProcedureBlog(selected);
        // The API may return either a single blog object or an array of blogs
        // belonging to this procedure. Normalize to a single object with htmlContent.
        let data = res?.data ?? null;
        if (Array.isArray(data)) {
          data = data.length > 0 ? data[0] : null;
        }
        if (isMounted) setContent(data);
      } catch (err) {
        console.error("Failed to fetch procedure content:", err);
        if (isMounted) setContent(null);
      } finally {
        if (isMounted) setContentLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [selected]);

  const selectedProcedure = useMemo(
    () => procedures.find((p) => p.id === selected) || null,
    [procedures, selected]
  );

  const safeHtml = useMemo(
    () => sanitizeHtml(decodeIfEscaped(content?.htmlContent || "")),
    [content]
  );

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#FDF3C4] to-[#fff8f0] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="h-20 md:h-40" />

        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#800000] mb-3">
            Our <span className="text-[#b8860b]">Procedures</span>
          </h1>
          <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#b8860b] mx-auto mb-4"></div>
          <p className="text-sm sm:text-base md:text-lg text-[#5B1A13] max-w-2xl mx-auto px-2">
            Comprehensive dental solutions with expert care and advanced technology
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-lg sm:text-xl text-[#800000]">Loading procedures...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-lg sm:text-xl text-red-700">{error}</p>
          </div>
        ) : procedures.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-lg sm:text-xl text-[#5B1A13]">No procedures available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {/* Left Sidebar */}
            <aside className="md:col-span-1 order-2 md:order-1">
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:sticky md:top-20">
                <h3 className="text-lg sm:text-xl font-bold text-[#800000] mb-4 pb-3 border-b-2 border-[#b8860b]">
                  Procedures
                </h3>
                <ul className="space-y-2 grid grid-cols-2 md:grid-cols-1 gap-2 sm:gap-3">
                  {procedures.map((proc) => {
                    const isActive = selected === proc.id;
                    return (
                      <li key={proc.id}>
                        <button
                          aria-current={isActive ? "page" : undefined}
                          className={`w-full text-left px-3 sm:px-4 py-2 rounded-lg transition font-semibold text-xs sm:text-sm md:text-base ${
                            isActive
                              ? "bg-[#800000] text-white shadow-md"
                              : "text-[#5B1A13] bg-[#FDF3C4] hover:bg-[#f5e3b3]"
                          }`}
                          onClick={() => setSelected(proc.id)}
                        >
                          {proc.procedureName}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Main Content */}
            <main className="md:col-span-3 order-1 md:order-2">
              {selectedProcedure ? (
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#800000] mb-4 md:mb-6 text-left">
                    {content?.title || selectedProcedure.procedureName}
                  </h2>
                  <div className="h-1 w-16 sm:w-20 bg-[#b8860b] mb-6"></div>

                  {contentLoading ? (
                    <p className="text-[#5B1A13]">Loading details...</p>
                  ) : safeHtml ? (
                    <div className="prose prose-lg max-w-none">
                      <div
                        className="text-xs sm:text-sm md:text-base text-[#5B1A13] leading-relaxed space-y-3 md:space-y-4 text-left"
                        dangerouslySetInnerHTML={{ __html: safeHtml }}
                      />
                    </div>
                  ) : (
                    <p className="text-[#5B1A13]">
                      Details for this procedure will be available soon.
                    </p>
                  )}

                  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#b8860b]">
                    <a
                      href="/contact"
                      onClick={scrollToTop}
                      className="inline-block bg-[#800000] hover:bg-[#b8860b] text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 shadow-md text-sm sm:text-base"
                    >
                      Book Consultation
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
                  <p className="text-base sm:text-lg md:text-xl text-[#5B1A13]">
                    Select a procedure to view details
                  </p>
                </div>
              )}
            </main>
          </div>
        )}

        <div className="h-32 md:h-20" />
      </div>
    </div>
  );
};

export default ProceduresNew;
