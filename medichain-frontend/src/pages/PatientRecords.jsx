import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientRecords() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    allergy: "",
    bloodGroup: "",
    nextOfKin: "",
    nextOfKinPhone: "",
    caregiverName: "",
    caregiverPhone: "",
  });

  const handleChange = (e) => setPatient({ ...patient, [e.target.name]: e.target.value });

  const handleUpdate = () => {
    alert("Patient information updated successfully!");
    console.log("Saved patient info:", patient);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Patient Records</h1>

        {Object.keys(patient).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 mb-1">{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              type={key === "age" ? "number" : "text"}
              name={key}
              value={patient[key]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 mb-4"
        >
          Save Info
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
