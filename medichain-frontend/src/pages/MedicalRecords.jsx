import { FileText, User, Activity, FlaskConical, Eye } from "lucide-react";

export default function MedicalRecords() {
  // Placeholder data (you’ll later replace this with API data)
  const patient = {
    id: "PT-09234",
    name: "John Doe",
    age: 34,
    allergy: "Penicillin",
    bloodGroup: "O+",
  };

  const operations = [
    { id: 1, date: "2024-05-12", type: "Appendectomy", doctor: "Dr. Kamau" },
    { id: 2, date: "2024-07-21", type: "MRI Scan - Brain", doctor: "Dr. Njeri" },
    { id: 3, date: "2025-01-03", type: "Physical Therapy", doctor: "Dr. Patel" },
  ];

  const labResults = [
    { id: 1, date: "2024-06-02", test: "Blood Test", file: "https://example.com/bloodtest.pdf" },
    { id: 2, date: "2024-08-15", test: "MRI Scan Results", file: "https://example.com/mri.pdf" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="text-blue-600" size={36} />
          <h1 className="text-3xl font-bold text-gray-800">Patient Medical Records</h1>
        </div>

        {/* Patient Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-100 p-5 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <User className="text-blue-500" size={22} /> Patient Information
            </h2>
            <p><strong>ID:</strong> {patient.id}</p>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Allergy:</strong> {patient.allergy}</p>
            <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
          </div>

          {/* Operations History */}
          <div className="bg-gray-100 p-5 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Activity className="text-green-500" size={22} /> Operations History
            </h2>
            <ul className="space-y-3">
              {operations.map((op) => (
                <li key={op.id} className="flex justify-between bg-white px-4 py-2 rounded-md border border-gray-200 shadow-sm">
                  <div>
                    <p className="font-medium text-gray-800">{op.type}</p>
                    <p className="text-sm text-gray-600">
                      {op.date} — <span className="italic">{op.doctor}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lab Results Section */}
        <div className="bg-gray-100 p-5 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
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
      </div>
    </div>
  );
}
