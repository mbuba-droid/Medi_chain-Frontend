import { useEffect, useState } from "react";
import { FileText, User, Activity, FlaskConical, Eye, ArrowLeft, PenLine } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function MedicalRecords() {
  const navigate = useNavigate();

  // Get patient info from localStorage
  const [patient, setPatient] = useState({
    id: "PT-00001",
    name: "",
    age: "",
    allergy: "",
    bloodGroup: "",
  });

  // Operations and lab results (temporary data for testing)
  const [operations, setOperations] = useState([
    {
      id: 1,
      date: "2024-05-12",
      type: "Appendectomy",
      doctor: "Dr. Kamau",
      notes: "Successful surgery, patient recovering well.",
    },
    {
      id: 2,
      date: "2024-07-21",
      type: "MRI Scan - Brain",
      doctor: "Dr. Njeri",
      notes: "No abnormalities detected in scan.",
    },
  ]);

  const [labResults, setLabResults] = useState([
    {
      id: 1,
      date: "2024-06-02",
      test: "Blood Test",
      file: "https://example.com/bloodtest.pdf",
    },
    {
      id: 2,
      date: "2024-08-15",
      test: "MRI Scan Results",
      file: "https://example.com/mri.pdf",
    },
  ]);

  useEffect(() => {
    const savedData = localStorage.getItem("patientData");
    if (savedData) {
      setPatient((prev) => ({
        ...prev,
        ...JSON.parse(savedData),
      }));
    }
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

        {/* Operations History */}
        <div className="bg-gray-100 p-5 rounded-xl border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Activity className="text-green-500" size={22} /> Operation History
          </h2>

          {operations.length > 0 ? (
            <ul className="space-y-4">
              {operations.map((op) => (
                <li
                  key={op.id}
                  className="bg-white p-4 rounded-md border border-gray-200 shadow-sm"
                >
                  <p className="font-medium text-gray-800">{op.type}</p>
                  <p className="text-sm text-gray-600">
                    {op.date} — <span className="italic">{op.doctor}</span>
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Notes:</strong> {op.notes}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No operation history recorded.</p>
          )}
        </div>

        {/* Lab Results Section */}
        <div className="bg-gray-100 p-5 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FlaskConical className="text-purple-500" size={22} /> Lab Results & Attachments
          </h2>

          {labResults.length > 0 ? (
            <ul className="space-y-3">
              {labResults.map((result) => (
                <li
                  key={result.id}
                  className="flex items-center justify-between bg-white px-4 py-2 rounded-md border border-gray-200 shadow-sm"
                >
                  <div>
                    <p className="font-medium text-gray-800">{result.test}</p>
                    <p className="text-sm text-gray-600">Date: {result.date}</p>
                  </div>
                  <a
                    href={result.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={18} />
                    View PDF
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No lab results uploaded yet.</p>
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
