import React, { useState, useEffect } from "react";
import { getAllBlogs } from "../services/dbservice";

const Procedures = () => {
  const [procedures, setProcedures] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProcedures() {
      try {
        const res = await getAllBlogs();
        setProcedures(res.data);
        if (res.data.length > 0) setSelected(res.data[0].id);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch procedures:", err);
        setLoading(false);
      }
    }
    fetchProcedures();
  }, []);

  const selectedProcedure = procedures.find((p) => p.id === selected);

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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {/* Left Sidebar */}
            <aside className="md:col-span-1 order-2 md:order-1">
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:sticky md:top-20">
                <h3 className="text-lg sm:text-xl font-bold text-[#800000] mb-4 pb-3 border-b-2 border-[#b8860b]">
                  Procedures
                </h3>
                <ul className="space-y-2 grid grid-cols-2 md:grid-cols-1 gap-2 sm:gap-3">
                  {procedures.map((proc) => (
                    <li key={proc.id}>
                      <button
                        className={`w-full text-left px-3 sm:px-4 py-2 rounded-lg transition font-semibold text-xs sm:text-sm md:text-base ${
                          selected === proc.id
                            ? "bg-[#800000] text-white shadow-md"
                            : "text-[#5B1A13] bg-[#FDF3C4] hover:bg-[#f5e3b3]"
                        }`}
                        onClick={() => setSelected(proc.id)}
                      >
                        {proc.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main Content */}
            <main className="md:col-span-3 order-1 md:order-2">
              {selectedProcedure ? (
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#800000] mb-4 md:mb-6 text-left">
                    {selectedProcedure.title}
                  </h2>
                  <div className="h-1 w-16 sm:w-20 bg-[#b8860b] mb-6"></div>
                  <div className="prose prose-lg max-w-none">
                    <div
                      className="text-xs sm:text-sm md:text-base text-[#5B1A13] leading-relaxed space-y-3 md:space-y-4 text-left"
                      dangerouslySetInnerHTML={{ __html: selectedProcedure.htmlContent }}
                    />
                  </div>
                  <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#b8860b]">
                    <button className="bg-[#800000] hover:bg-[#b8860b] text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition duration-300 shadow-md text-sm sm:text-base">
                      Book Consultation
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
                  <p className="text-base sm:text-lg md:text-xl text-[#5B1A13]">Select a procedure to view details</p>
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

export default Procedures;