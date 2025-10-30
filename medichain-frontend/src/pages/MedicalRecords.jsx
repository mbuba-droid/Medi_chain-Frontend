import { useEffect, useState } from "react";
import { FileText, User, Activity, FlaskConical, Eye, ArrowLeft, PenLine } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function MedicalRecords() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get patient info from localStorage
  const [patient, setPatient] = useState({
    id: "",
    name: "",
    age: "",
    allergy: "",
    bloodGroup: "",
  });

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patient profile
        const profileResponse = await api.get("/patient/profile");
        const profileData = profileResponse.data;
        setPatient({
          id: profileData.id,
          name: profileData.full_name,
          age: profileData.date_of_birth ? new Date().getFullYear() - new Date(profileData.date_of_birth).getFullYear() : "",
          allergy: profileData.allergies || "",
          bloodGroup: "",
        });

        // Fetch medical records
        const recordsResponse = await api.get("/patient/records");
        setRecords(recordsResponse.data);
      } catch (err) {
        setError("Failed to load medical records");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="min-h-screen py-10 px-6"
      style={{
        backgroundImage: `url('/ChatGPT Image Oct 26, 2025, 12_13_36 PM.png')`,
        backgroundSize: "cover",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="text-blue-600" size={36} />
          <h1 className="text-3xl font-bold text-gray-800">Patient Medical Records</h1>
        </div>

        {/* Patient Information */}
        <div className="bg-gray-100 p-5 rounded-xl border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <User className="text-blue-500" size={22} /> Patient Information
          </h2>
          <p><strong>ID:</strong> {patient.id}</p>
          <p><strong>Name:</strong> {patient.name || "—"}</p>
          <p><strong>Age:</strong> {patient.age || "—"}</p>
          <p><strong>Allergy:</strong> {patient.allergy || "—"}</p>
          <p><strong>Blood Group:</strong> {patient.bloodGroup || "—"}</p>
        </div>

        {/* Medical Records */}
        <div className="bg-gray-100 p-5 rounded-xl border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Activity className="text-green-500" size={22} /> Medical Records
          </h2>

          {loading ? (
            <p className="text-gray-500 italic">Loading records...</p>
          ) : error ? (
            <p className="text-red-500 italic">{error}</p>
          ) : records.length > 0 ? (
            <ul className="space-y-4">
              {records.map((record) => (
                <li
                  key={record.id}
                  className="bg-white p-4 rounded-md border border-gray-200 shadow-sm"
                >
                  <p className="font-medium text-gray-800">Diagnosis: {record.diagnosis || "N/A"}</p>
                  <p className="text-sm text-gray-600">
                    Date: {record.date_of_visit || "N/A"}
                  </p>
                  {record.prescription && (
                    <p className="text-gray-700 mt-2">
                      <strong>Prescription:</strong> {record.prescription}
                    </p>
                  )}
                  {record.file_url && (
                    <a
                      href={record.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-2"
                    >
                      <Eye size={18} />
                      View Attachment
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No medical records found.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-10">
          <Link
            to="/patient-dashboard"
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 inline-flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <button
            onClick={() => navigate("/patient-management")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 inline-flex items-center gap-2"
          >
            <PenLine size={18} />
            Update Records
          </button>
        </div>
      </div>
    </div>
  );
}
