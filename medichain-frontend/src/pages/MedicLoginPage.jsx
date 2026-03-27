import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MedicLoginPage() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const registeredMedic = JSON.parse(localStorage.getItem("registeredMedic"));

    if (!registeredMedic) {
      setError("No registered medic found. Please register first.");
      return;
    }

    if (fullName !== registeredMedic.fullName) {
      setError("Incorrect name or not registered.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Save logged in medic
    localStorage.setItem("loggedInMedic", JSON.stringify(registeredMedic));

    alert(`Welcome, Dr. ${registeredMedic.fullName}!`);
    navigate("/medic-dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Medic Login</h1>

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border p-3 rounded-md"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-md"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-3 rounded-md"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-3 rounded-md hover:bg-blue-700 transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
