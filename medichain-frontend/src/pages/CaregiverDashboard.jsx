// src/pages/CaregiverDashboard.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Stethoscope, Pill, CalendarDays, Heart, FileText } from "lucide-react";
import api from "../api";

const caregiverTips = [
  "Check patient prescriptions daily for accuracy.",
  "Ensure patients attend scheduled appointments.",
  "Monitor patient adherence to medication plans.",
  "Encourage patients to maintain healthy lifestyles.",
  "Keep communication open with patients and families.",
];

export default function CaregiverDashboard() {
  const navigate = useNavigate();
  const [currentTip, setCurrentTip] = useState(0);
  const [patientId, setPatientId] = useState("");
  const [patientRecords, setPatientRecords] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newCaregiver, setNewCaregiver] = useState({
    full_name: "",
    phone: "",
    email: "",
    relation: ""
  });

  const fetchPatientRecords = async () => {
    if (!patientId) return;

    setLoading(true);
    setError("");

    try {
      const response = await api.get(`/caregiver/${patientId}/records`);
      setPatientRecords(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch patient records.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCaregivers = async () => {
    if (!patientId) return;

    try {
      // Assuming we have an endpoint to fetch caregivers for a patient
      // For now, we'll simulate or add later if needed
      // const response = await api.get(`/patient/${patientId}/caregivers`);
      // setCaregivers(response.data);
    } catch (err) {
      console.error("Failed to fetch caregivers:", err);
    }
  };

  const addCaregiver = async () => {
    if (!patientId || !newCaregiver.full_name) return;

    setLoading(true);
    setError("");

    try {
      await api.post("/caregiver/register", {
        patient_id: patientId,
        full_name: newCaregiver.full_name,
        phone: newCaregiver.phone,
        email: newCaregiver.email,
        relation: newCaregiver.relation
      });
      alert("Caregiver added successfully!");
      setNewCaregiver({ full_name: "", phone: "", email: "", relation: "" });
      fetchCaregivers();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add caregiver.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prevTip) => (prevTip + 1) % caregiverTips.length);
    }, 10000); // Change tip every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white px-8 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-4">
          <Stethoscope className="text-white" size={32} />
          <h1 className="text-2xl font-bold text-white">Caregiver Portal</h1>
        </div>
        <div className="flex space-x-6">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/caregiver-login");
            }}
            className="text-red-300 hover:text-red-100 font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Patient Management Section */}
      <div className="bg-white shadow-md px-8 py-6 mx-8 my-8 rounded-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Patient Management</h3>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => { fetchPatientRecords(); fetchCaregivers(); }}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Load Patient Data"}
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Add Caregiver Section */}
        {patientId && (
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h4 className="text-lg font-semibold mb-2">Add Caregiver</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newCaregiver.full_name}
                onChange={(e) => setNewCaregiver({ ...newCaregiver, full_name: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={newCaregiver.phone}
                onChange={(e) => setNewCaregiver({ ...newCaregiver, phone: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={newCaregiver.email}
                onChange={(e) => setNewCaregiver({ ...newCaregiver, email: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Relation"
                value={newCaregiver.relation}
                onChange={(e) => setNewCaregiver({ ...newCaregiver, relation: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={addCaregiver}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add Caregiver"}
            </button>
          </div>
        )}

        {/* Patient Records */}
        {patientRecords.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Patient Records:</h4>
            {patientRecords.map((record) => (
              <div key={record.id} className="bg-gray-50 p-4 rounded-md">
                <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                <p><strong>Prescription:</strong> {record.prescription}</p>
                <p><strong>Date of Visit:</strong> {record.date_of_visit}</p>
                <p><strong>Created At:</strong> {record.created_at}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Welcome Section */}
      <div className="text-center my-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome, Caregiver!</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Manage patient prescriptions and appointments efficiently.
        </p>
      </div>

      {/* Main Actions */}
      <div className="grid gap-8 md:grid-cols-3 w-full max-w-6xl mx-auto mb-12">
        {/* Medical Records */}
        <div className="group flex flex-col items-center bg-gradient-to-br from-purple-500 to-purple-600 p-10 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-white cursor-pointer">
          <FileText size={56} className="mb-4 group-hover:animate-pulse" />
          <h3 className="text-2xl font-bold mb-3">Medical Records</h3>
          <p className="text-center opacity-90">
            Access and review patient medical history and records.
          </p>
        </div>

        {/* Prescriptions */}
        <Link
          to="/prescriptions"
          className="group flex flex-col items-center bg-gradient-to-br from-green-500 to-green-600 p-10 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-white"
        >
          <Pill size={56} className="mb-4 group-hover:animate-pulse" />
          <h3 className="text-2xl font-bold mb-3">Prescriptions</h3>
          <p className="text-center opacity-90">
            View and manage patient medications, dosages, and refill schedules.
          </p>
        </Link>

        {/* Appointments */}
        <Link
          to="/appointments"
          className="group flex flex-col items-center bg-gradient-to-br from-blue-500 to-blue-600 p-10 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-white"
        >
          <CalendarDays size={56} className="mb-4 group-hover:animate-pulse" />
          <h3 className="text-2xl font-bold mb-3">Appointments</h3>
          <p className="text-center opacity-90">
            Track and manage patient appointments and upcoming visits.
          </p>
        </Link>
      </div>

      {/* Caregiver Tip */}
      <div className="w-full max-w-4xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl border-l-4 border-yellow-500">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">💡 Caregiver Tip of the Day</h4>
          <p className="text-gray-700">{caregiverTips[currentTip]}</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center text-blue-100 text-sm">
          © 2025 MediChain. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
