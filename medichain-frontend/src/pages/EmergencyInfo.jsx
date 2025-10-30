import { useState, useEffect } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function EmergencyInfo() {
  const [info, setInfo] = useState({
    bloodGroup: "",
    publicVisible: false,
    publicPhoneVisible: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current emergency profile
    const fetchProfile = async () => {
      try {
        const response = await api.get("/patient/profile");
        const patient = response.data;
        // Assuming emergency profile is linked, but for now, just set defaults
        setInfo({
          bloodGroup: patient.blood_type || "",
          publicVisible: patient.public_visible || false,
          publicPhoneVisible: patient.public_phone_visible || false,
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInfo({ ...info, [name]: type === "checkbox" ? checked : value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      await api.put("/patient/emergency-profile", {
        blood_type: info.bloodGroup,
        public_visible: info.publicVisible,
        public_phone_visible: info.publicPhoneVisible,
      });
      alert("Emergency information updated successfully!");
      // Navigate to emergency loading page with patient ID
      const patientId = localStorage.getItem("patient_id");
      navigate(`/emergency-info/${patientId}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update emergency information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex items-center mb-6">
          <AlertTriangle className="text-red-600 mr-3" size={32} />
          <h1 className="text-2xl font-bold text-red-700">
            Emergency Information
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Emergency Profile Info */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-1">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={info.bloodGroup}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="O+"
            />
          </div>

          {/* Visibility Settings */}
          <div className="border border-red-200 bg-red-50 rounded-lg p-4 mt-4">
            <h2 className="text-lg font-semibold text-red-700 mb-2">
              Public Visibility Settings
            </h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="publicVisible"
                  checked={info.publicVisible}
                  onChange={handleChange}
                  className="mr-2"
                />
                Make emergency profile publicly visible
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="publicPhoneVisible"
                  checked={info.publicPhoneVisible}
                  onChange={handleChange}
                  className="mr-2"
                />
                Show phone number publicly
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Emergency Info"}
        </button>

        <div className="text-center mt-6">
          <Link
            to="/patient-dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
