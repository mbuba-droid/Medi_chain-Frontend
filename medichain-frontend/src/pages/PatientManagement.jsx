import { useState } from "react";
import { Upload, ClipboardList, Stethoscope, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api";

export default function PatientManagement() {
  const [record, setRecord] = useState({
    diagnosis: "",
    prescription: "",
    date_of_visit: "",
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
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

      setRecord((prev) => ({
        ...prev,
        file_url: data.secure_url,
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

  const handleSave = async () => {
    if (!record.diagnosis || !record.prescription || !record.date_of_visit) {
      setError("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await api.post("/patient/records", {
        diagnosis: record.diagnosis,
        prescription: record.prescription,
        date_of_visit: record.date_of_visit,
        file_url: record.file_url || null,
      });

      setToastMessage("Medical record added successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      // Reset form
      setRecord({
        diagnosis: "",
        prescription: "",
        date_of_visit: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save record.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundImage: `url('/ChatGPT Image Oct 26, 2025, 12_01_19 PM.png')`, backgroundSize: 'cover', backgroundPosition: 'left', backgroundRepeat: 'no-repeat' }}>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <div className="flex items-center mb-6">
          <ClipboardList className="text-blue-600 mr-3" size={28} />
          <h1 className="text-2xl font-bold text-blue-700">Patient Management</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Diagnosis *</label>
            <input
              type="text"
              name="diagnosis"
              value={record.diagnosis}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter diagnosis"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Prescription *</label>
            <textarea
              name="prescription"
              rows="3"
              value={record.prescription}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter prescription details"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Date of Visit *</label>
            <input
              type="date"
              name="date_of_visit"
              value={record.date_of_visit}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
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

        {/* Uploaded File */}
        {record.file_url && (
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Attached File</label>
            <div className="bg-gray-100 p-3 rounded-md flex justify-between">
              <p>File attached successfully</p>
              <a
                href={record.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View File
              </a>
            </div>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Medical Record"}
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
