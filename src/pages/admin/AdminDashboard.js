import React, { useState } from "react";
import AddProcedure from "./procedure";
import BlogEditor from "./BlogEditorFixed";
import Gallery from "./Gallery";

const TABS = [
  { id: "procedure", label: "Procedures" },
  { id: "blog",      label: "Blog Editor" },
  { id: "gallery",   label: "Gallery" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("procedure");

  return (
    <div className="bg-[#FDF3C4] min-h-screen">
      {/* Spacer for site header */}
      <div className="h-20 md:h-40" />

      {/* Tab bar */}
      <div className="bg-white border-b-2 border-[#b8860b] shadow">
        <div className="container mx-auto flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm sm:text-base font-bold transition border-b-4 ${
                activeTab === tab.id
                  ? "border-[#800000] text-[#800000]"
                  : "border-transparent text-[#5B1A13] hover:bg-[#f5e3b3]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab panels — all three stay mounted so each keeps its own state.
          Each sub-component adds its own header-spacer div (h-32 md:h-40),
          so we pull it back up with a matching negative margin. */}
      <div className={activeTab === "procedure" ? "block -mt-32 md:-mt-40" : "hidden"}>
        <AddProcedure />
      </div>
      <div className={activeTab === "blog" ? "block -mt-16 md:-mt-40" : "hidden"}>
        <BlogEditor />
      </div>
      <div className={activeTab === "gallery" ? "block -mt-24 md:-mt-32" : "hidden"}>
        <Gallery />
      </div>
    </div>
  );
};

export default AdminDashboard;
