import { useState } from "react";
import { Upload, ClipboardList, Stethoscope, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PatientManagement() {
  const [patientOps, setPatientOps] = useState({
    patientId: "",
    operationType: "",
    doctorsName: "",
    notes: "",
    date: "",
    documents: [],
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleChange = (e) => {
    setPatientOps({ ...patientOps, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!pdfFile) return alert("Please select a file first.");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      const newDoc = {
        fileName: pdfFile.name,
        url: data.secure_url,
        date: new Date().toLocaleDateString(),
      };

      setPatientOps((prev) => ({
        ...prev,
        documents: [...prev.documents, newDoc],
      }));

      alert("File uploaded successfully!");
      setPdfFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    console.log("Updated Patient Ops:", patientOps);
    setToastMessage("Patient operation details updated successfully!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundImage: `url('/ChatGPT Image Oct 26, 2025, 12_01_19 PM.png')`, backgroundSize: 'cover', backgroundPosition: 'left', backgroundRepeat: 'no-repeat' }}>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <div className="flex items-center mb-6">
          <ClipboardList className="text-blue-600 mr-3" size={28} />
          <h1 className="text-2xl font-bold text-blue-700">Patient Management</h1>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Patient ID</label>
            <input
              type="text"
              name="patientId"
              value={patientOps.patientId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Operation / MRI Type</label>
            <input
              type="text"
              name="operationType"
              value={patientOps.operationType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Doctor's Name</label>
            <input
              type="text"
              name="doctorsName"
              value={patientOps.doctorsName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Notes</label>
            <textarea
              name="notes"
              rows="3"
              value={patientOps.notes}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Date of Operation</label>
            <input
              type="date"
              name="date"
              value={patientOps.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Upload File */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Upload Lab Results and Attachments</label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center"
            onClick={() => document.getElementById('file-input').click()}
          >
            <Upload className="text-gray-500 mb-2" size={32} />
            <p className="text-gray-600 text-center">
              {pdfFile ? `Selected: ${pdfFile.name}` : "Click to select or drag and drop files here"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Supported: PDFs, Images, Docs, TXT</p>
            <input
              id="file-input"
              type="file"
              accept="application/pdf,image/*,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {pdfFile && (
            <button
              onClick={uploadFile}
              disabled={uploading}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <Upload className="mr-2" size={18} />
              {uploading ? "Uploading..." : "Upload File"}
            </button>
          )}
        </div>

        {/* Uploaded Docs */}
        {patientOps.documents.length > 0 && (
          <div className="space-y-3 mb-6">
            {patientOps.documents.map((doc, idx) => (
              <div key={idx} className="bg-gray-100 p-3 rounded-md flex justify-between">
                <p>{doc.fileName} — <span className="text-sm text-gray-500">{doc.date}</span></p>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSave}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Save Operation Details
        </button>

        {/* View Medical Records */}
        <div className="text-center mt-6">
          <a
            href="/medical-records"
            className="text-blue-600 font-medium hover:underline"
          >
            View Medical Records →
          </a>
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <Link
            to="/patient-dashboard"
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 inline-flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-xl text-center">
              {toastMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
