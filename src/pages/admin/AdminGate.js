import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AdminDashboard from "./AdminDashboard";

const SESSION_KEY = "jdc_admin_auth";

// Credentials are intentionally obfuscated (not plain text).
// This is a client-side gate only — for real security, implement
// server-side authentication.
const check = (u, p) =>
  u === atob("RHJBZG1pbg==") && p === atob("RHJBZG1pbjIwMjQ=");

const AdminGate = () => {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Persist login for the browser session
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (check(username.trim(), password)) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setUsername("");
    setPassword("");
    navigate("/");
  };

  if (authed) {
    return (
      <div>
        {/* Logout bar */}
        <div className="fixed top-0 right-0 z-[999] p-2">
          <button
            onClick={handleLogout}
            className="text-xs bg-[#800000] hover:bg-[#a00000] text-white px-3 py-1 rounded shadow"
          >
            Logout
          </button>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF3C4] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm border border-[#b8860b]">
        <h2 className="text-2xl font-bold text-[#800000] text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-[#800000] font-semibold mb-1 text-sm">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              required
              className="w-full px-4 py-2 border border-[#b8860b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b] text-sm"
            />
          </div>

          <div>
            <label className="block text-[#800000] font-semibold mb-1 text-sm">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                className="w-full px-4 py-2 pr-10 border border-[#b8860b] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b] text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b8860b] text-xs"
                tabIndex={-1}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-700 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#800000] hover:bg-[#a00000] text-white font-bold py-2 rounded-lg transition mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminGate;
