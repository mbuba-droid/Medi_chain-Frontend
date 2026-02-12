import { useState } from "react";
import { Heart, FileText } from "lucide-react";

export default function PatientRecords() {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    allergy: "",
    bloodGroup: "",
  });

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    console.log("Updated patient info:", patient);
    alert("Patient information updated successfully!");
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center mb-6">
          <Heart className="text-red-600 mr-3" size={28} />
          <h1 className="text-2xl font-bold text-blue-700">Patient Information</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={patient.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={patient.age}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Allergies</label>
            <input
              type="text"
              name="allergy"
              value={patient.allergy}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={patient.bloodGroup}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <button
          onClick={handleUpdate}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Update Info
        </button>

        <div className="text-center mt-6">
          <a
            href="/medical-records"
            className="text-blue-600 font-medium hover:underline flex items-center justify-center gap-1"
          >
            <FileText size={18} /> View Medical Records
          </a>
        </div>
      </div>
    </div>
  );
}
