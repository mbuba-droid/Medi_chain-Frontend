import { useState } from "react";
import { Upload, ClipboardList, Stethoscope } from "lucide-react";

export default function PatientManagement() {
  const [patientOps, setPatientOps] = useState({
    patientId: "",
    operationType: "",
    notes: "",
    date: "",
    documents: [],
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleChange = (e) => {
    setPatientOps({ ...patientOps, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const uploadPdf = async () => {
    if (!pdfFile) return alert("Please select a PDF file first.");
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

      alert("PDF uploaded successfully!");
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
    alert("Patient operation details updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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

        {/* Upload PDF */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Upload MRI/Operation Report</label>
          <div className="flex items-center gap-3">
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button
              onClick={uploadPdf}
              disabled={uploading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <Upload className="mr-2" size={18} />
              {uploading ? "Uploading..." : "Upload PDF"}
            </button>
          </div>
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
      </div>
    </div>
  );
}
