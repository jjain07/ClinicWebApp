import React, { useState, useEffect } from "react";

import {
  createProcedure,
  updateProcedure,
  getAllProcedures,
} from "../../services/dbservice";

const AddProcedure = () => {
  const [procedures, setProcedures] = useState([]);
  const [selected, setSelected] = useState(null); // id of procedure being edited (null = Add New)
  const [selectedProcedureId, setSelectedProcedureId] = useState(""); // parent procedure id
  const [procedureName, setProcedureName] = useState("");
  const [saving, setSaving] = useState(false);

  const refreshProcedures = async () => {
    const res = await getAllProcedures();
    setProcedures(res.data || []);
    return res.data || [];
  };

  useEffect(() => {
    (async () => {
      try {
        await refreshProcedures();
      } catch (err) {
        console.error("Failed to fetch procedures:", err);
      }
    })();
  }, []);

  // Compare ids in a type-safe way (select values come back as strings)
  const sameId = (a, b) =>
    a !== null && a !== undefined && b !== null && b !== undefined &&
    String(a) === String(b);

  const handleSave = async () => {
    if (!procedureName.trim()) {
      alert("Please enter a procedure name.");
      return;
    }
    // Prevent making a procedure its own parent
    if (selected && sameId(selected, selectedProcedureId)) {
      alert("A procedure cannot be its own parent.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        procedureName: procedureName.trim(),
        procedureParentId: selectedProcedureId || 0,
      };
      if (selected) {
        await updateProcedure(selected, { id: selected, ...payload });
      } else {
        await createProcedure(payload);
      }
      await refreshProcedures();
      alert(selected ? "Procedure updated!" : "Procedure created!");
      if (!selected) {
        // Reset form after a successful create
        setProcedureName("");
        setSelectedProcedureId("");
      }
    } catch (err) {
      console.error("Failed to save procedure:", err);
      alert("Failed to save procedure. Please try again.");
    } finally {
      setSaving(false);
    }
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

  // Exclude the currently-edited procedure from the parent dropdown
  const parentOptions = procedures.filter((p) => !sameId(p.id, selected));

  return (
    <div className="p-6 bg-[#FDF3C4]">
      <div className="container mx-auto">
        <div className="h-32 md:h-40" />
        <div className="min-h-screen bg-[#FDF3C4] flex flex-col md:flex-row">
          {/* Left Side Menu */}
          <aside className="md:w-1/4 w-full bg-[#FDF3C4] shadow-lg border-r-2 border-[#b8860b] p-6">
            <h3 className="text-lg font-bold text-[#800000] mb-4">Procedures</h3>
            <ul className="space-y-2">
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded transition font-semibold ${
                    selected === null
                      ? "bg-[#b8860b] text-white"
                      : "text-[#5B1A13] hover:bg-[#f5e3b3]"
                  }`}
                  onClick={() => getSelectedProc(null)}
                >
                  Add New Procedure
                </button>
              </li>
              {procedures.map((proc) => (
                <li key={proc.id}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded transition font-semibold ${
                      sameId(selected, proc.id)
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
              <h2 className="text-2xl font-bold text-[#800000] mb-6 text-center">
                {selected === null ? "Add Procedure" : "Update Procedure"}
              </h2>
              <div className="mb-4">
                <label className="block text-[#800000] font-semibold mb-2">
                  Parent Procedure
                </label>
                <select
                  value={selectedProcedureId}
                  onChange={(e) => setSelectedProcedureId(e.target.value)}
                  className="w-full px-4 py-2 border border-[#b8860b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
                >
                  <option value="">Select Procedure</option>
                  {parentOptions.map((proc) => (
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
                disabled={saving}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-60"
              >
                {saving
                  ? "Saving…"
                  : selected === null
                  ? "Save Procedure"
                  : "Update Procedure"}
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AddProcedure;