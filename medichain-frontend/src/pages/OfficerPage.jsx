import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OfficerPage() {
  const [medicalId, setMedicalId] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!medicalId || !file) {
      alert("Please provide your Medical ID and upload a certificate.");
      return;
    }

    setUploading(true);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "MediChain_Uploads");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/df6nluss6/image/upload",
        { method: "POST", body: data }
      );

      const result = await res.json();

      // Immediately proceed if we get a URL
      if (result.secure_url) {
        localStorage.setItem(
          "verifiedMedic",
          JSON.stringify({
            medical_id: medicalId,
            certificate: result.secure_url,
            verified: true,
          })
        );

        navigate("/medic-register");
      } else {
        alert("Authentication failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check your connection or try a smaller file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Medical Officer Portal</h1>

      <form
        onSubmit={handleAuth}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Medical ID / License Number"
          value={medicalId}
          onChange={(e) => setMedicalId(e.target.value)}
          className="w-full border p-3 rounded-md"
          required
        />

        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="w-full"
          required
        />

        <button
          type="submit"
          disabled={uploading}
          className="bg-green-600 text-white w-full p-3 rounded-md hover:bg-green-700 transition"
        >
          {uploading ? "Authenticating..." : "Authenticate"}
        </button>
      </form>
    </div>
  );
}
