import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertTriangle, LogIn, Share2 } from "lucide-react";
import QRCode from "react-qr-code";
import api from "../api";

export default function EmergencyInfoLandingPage() {
  const { patientId } = useParams();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmergencyInfo = async () => {
      try {
        const response = await api.get(`/emergency/${patientId}`);
        setInfo(response.data);
      } catch (err) {
        setError("Failed to load emergency information.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchEmergencyInfo();
    }
  }, [patientId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <p className="text-gray-700">Loading emergency information...</p>
      </div>
    );
  }

  if (error || !info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700">{error || "No emergency info found for this patient."}</p>
      </div>
    );
  }

  const qrLink = `${window.location.origin}/emergency-info/${patientId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrLink);
    alert("Emergency info link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center mb-6">
          <AlertTriangle className="text-red-600 mr-3" size={32} />
          <h1 className="text-2xl font-bold text-red-700">
            Emergency Information
          </h1>
        </div>

        {/* Patient Info */}
        <div className="space-y-3 mb-8">
          <p><strong>Name:</strong> {info.full_name}</p>
          <p><strong>Phone:</strong> {info.phone || "Not visible"}</p>
          <p><strong>Allergies:</strong> {info.allergies || "None"}</p>
          <p><strong>First Aid Procedure:</strong> {info.first_aid_procedure || "None"}</p>
          <p><strong>Next of Kin:</strong> {info.next_of_kin_name || "None"}</p>
          <p><strong>Next of Kin Phone:</strong> {info.next_of_kin_phone || "None"}</p>
          <p><strong>Caregiver:</strong> {info.caregiver_name || "None"}</p>
          <p><strong>Caregiver Phone:</strong> {info.caregiver_phone || "None"}</p>
          <p><strong>Blood Type:</strong> {info.blood_type || "Unknown"}</p>
        </div>

        {/* QR Section */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-gray-700 mb-2">Scan QR to access this page:</p>
          <div className="bg-white p-3 rounded-lg shadow">
            <QRCode value={qrLink} size={128} />
          </div>
          <p className="text-xs text-gray-500 mt-2">{qrLink}</p>
        </div>

        {/* Copy Link Button */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            <Share2 size={18} className="mr-2" /> Copy QR Link
          </button>
        </div>

        {/* Login Button */}
        <Link
          to="/login"
          className="flex items-center justify-center bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          <LogIn size={18} className="mr-2" /> Login
        </Link>
      </div>
    </div>
  );
}
