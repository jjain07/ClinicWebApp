import React, { useState, useRef,  useEffect } from "react";
 
import "react-quill/dist/quill.snow.css";

import {
  createProcedure, updateProcedure,
  getAllProcedures} from "../../services/dbservice";
 
const AddProcedure = () => {
    const quillRef = useRef();
      const prevImagesRef = useRef([]); // Track previous images

    
  const [procedures, setProcedures] = useState([]);
    const [selected, setSelected] = useState(null);
    const [selectedProcedureId, setSelectedProcedureId] = useState(""); // For dropdown
  const [procedureName, setProcedureName] = useState("");


    useEffect(() => {
      async function fetchProcedures() {
        try {
          const res = await getAllProcedures();
          setProcedures(res.data);
          console.log("Fetched procedures:", res.data);
          if (res.data.length > 0) setSelected(res.data[0].key || res.data[0].id);
                   
          setSelectedProcedureId(res.data[0].id || ""); // Set default ProcedureId
 
        } catch (err) {
          console.error("Failed to fetch procedures:", err);
        }
      }
      fetchProcedures();
    }, []);
  
    const selectedProcedure = procedures.find(
      
      (p) => p.key === selected || p.id === selected
    );


 
    const handleSave = async () => {
      alert("Saving procedure...");
       selected 
      if(selected ){
        alert(selected);
         // Update existing blog
        await updateProcedure (selected, { id: selected, procedureName,   procedureParentId: selectedProcedureId||0 });
        const res = await getAllProcedures();
          setProcedures(res.data);
      } else {
        alert("create");
        // Create new blog
        await createProcedure({ procedureName,  procedureParentId: selectedProcedureId||0 });
        const res = await getAllProcedures();
          setProcedures(res.data);
      }
 
    alert("Procedure saved!");
  };
const getSelectedProc = (proc) => {
  if (!proc) {
    setSelected(null);
    setProcedureName("");
    setSelectedProcedureId("");
  } else {
    setSelected(proc.id);
    setProcedureName(proc.procedureName || "");
    setSelectedProcedureId(proc.procedureParentId || "");
  } 
};
  return (
 <div className="p-6 bg-[#FDF3C4]">
      <div className="container mx-auto">
        <div className="h-32 md:h-40" />
        <div className="min-h-screen bg-[#FDF3C4] flex flex-col md:flex-row">
          {/* Left Side Menu */}
          <aside className="md:w-1/4 w-full bg-[#FDF3C4] shadow-lg border-r-2 border-[#b8860b] p-6">
            <h3 className="text-lg font-bold text-[#800000] mb-4">Procedures</h3>
            <ul className="space-y-2">
               <button
                    className={`w-full text-left px-4 py-2 rounded transition font-semibold `}
                    onClick={() => getSelectedProc(null)}
                  >Add New Procedure </button>
              {procedures.map((proc) => (
                <li key={proc.id}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded transition font-semibold ${
                      selected ===  proc.id
                        ? "bg-[#b8860b] text-white"
                        : "text-[#5B1A13] hover:bg-[#f5e3b3]"
                    }`}
                    onClick={() => getSelectedProc(proc)}
                  >
                    {proc.procedureName}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          {/* Content Area */}
          <main className="flex-1 p-8 w-full">
            <div className="max-w-8xl text-lg bg-[#FDF3C4] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#800000] mb-6 text-center">Add Procedure</h2>
  <div className="mb-4">
                <label className="block text-[#800000] font-semibold mb-2">Select Procedure</label>
                <select
                  value={selectedProcedureId}
                  onChange={(e) => setSelectedProcedureId(e.target.value)}
                  className="w-full px-4 py-2 border border-[#b8860b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
                >
                  <option value="">Select Procedure</option>
                  {procedures.map((proc) => (
                    <option key={proc.id} value={proc.id}>
                      {proc.procedureName}
                    </option>
                  ))}
                </select>
              </div>
 <input
                type="text"
                value={procedureName}
                onChange={(e) => setProcedureName(e.target.value)}
                placeholder="Enter Procedure Name"
                className="w-full mb-4 px-4 py-2 border border-[#b8860b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
              />
             
       
          <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
    {selected === null ? "Save Procedure" : "Update Procedure"}
      </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
  
 
}
export default AddProcedure;