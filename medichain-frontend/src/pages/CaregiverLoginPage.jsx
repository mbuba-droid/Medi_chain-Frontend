// src/pages/CaregiverLoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import api from "../api";

export default function CaregiverLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      // Note: Caregiver login endpoint not implemented in backend yet
      // For now, redirect to dashboard (this needs backend implementation)
      navigate("/caregiver-dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col justify-center items-center">
      {/* Header */}
      <div className="flex items-center mb-12">
        <Stethoscope className="text-blue-600 mr-3" size={40} />
        <h1 className="text-3xl font-bold text-gray-800">Caregiver Login</h1>
      </div>

      {/* Login Form */}
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        © 2025 MediChain. All rights reserved.
      </footer>
    </div>
  );
}
