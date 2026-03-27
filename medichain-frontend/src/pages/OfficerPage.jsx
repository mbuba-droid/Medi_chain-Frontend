import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

export default function OfficerPage() {
  const [medicalId, setMedicalId] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!file || !medicalId) {
      alert("Please enter your Medical ID and upload your certificate.");
      return;
    }

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "MediChain_Uploads"); // your Cloudinary preset

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/df6nluss6/image/upload`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result.secure_url) {
        localStorage.setItem(
          "verifiedMedic",
          JSON.stringify({
            medical_id: medicalId,
            certificate: result.secure_url,
            verified: true,
          })
        );

        alert("Medical certificate uploaded successfully!");
        navigate("/medic-register");
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please check your connection.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Medical Officer Portal</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Please provide your Medical ID and upload your valid medical certificate for verification.
      </p>

      <form
        onSubmit={handleAuth}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Medical ID / License Number</label>
          <input
            type="text"
            value={medicalId}
            onChange={(e) => setMedicalId(e.target.value)}
            placeholder="Enter your Medical ID"
            className="w-full border p-3 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Upload Medical Certificate (Image or PDF)
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="flex items-center justify-center gap-2 bg-green-600 text-white w-full p-3 rounded-md hover:bg-green-700 transition"
        >
          <Upload size={20} />
          {uploading ? "Uploading..." : "Upload Medical Certificate"}
        </button>
      </form>
    </div>
  );
}
