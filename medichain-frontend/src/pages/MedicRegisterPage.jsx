import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MedicRegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [medicalId, setMedicalId] = useState("");
  const [certificate, setCertificate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Load verified medic info from localStorage
    const medic = JSON.parse(localStorage.getItem("verifiedMedic"));
    if (medic?.verified) {
      setMedicalId(medic.medical_id);
      setCertificate(medic.certificate);
    } else {
      // If not authenticated, redirect back to OfficerPage
      navigate("/officer");
    }
  }, [navigate]);

  const handleRegister = (e) => {
    e.preventDefault();

    // Save registration info temporarily
    localStorage.setItem(
      "registeredMedic",
      JSON.stringify({
        fullName,
        email,
        phoneNumber,
        specialization,
        medicalId,
        certificate,
      })
    );

    alert("Registration complete! Please log in to continue.");
    localStorage.removeItem("verifiedMedic"); // clear temp verification
    navigate("/medic-login"); // go to login page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Medic Registration
      </h1>

      <form
        onSubmit={handleRegister}
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
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-md"
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full border p-3 rounded-md"
          required
        />

        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="w-full border p-3 rounded-md"
        />

        <input
          type="text"
          value={medicalId}
          disabled
          className="w-full border p-3 rounded-md bg-gray-100"
        />

        <p className="text-gray-600 text-sm">
          Certificate uploaded:{" "}
          <a
            href={certificate}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            View
          </a>
        </p>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-3 rounded-md hover:bg-blue-700 transition"
        >
          Complete Registration
        </button>
      </form>
    </div>
  );
}
