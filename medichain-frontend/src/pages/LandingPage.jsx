import { Link } from "react-router-dom";
import { Hospital, User } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
      {/* Header */}
      <Hospital size={64} className="text-blue-600 mb-4" />
      <h1 className="text-4xl font-bold text-blue-700 mb-3 text-center">
        Welcome to MediChain
      </h1>
      <p className="text-gray-600 mb-10 text-center max-w-md">
        Your trusted healthcare companion. Access and manage your medical records securely from anywhere.
      </p>

      {/* Patient Card */}
      <Link
        to="/patient"
        className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all border border-gray-200 w-full max-w-sm"
      >
        <User size={48} className="text-blue-500 mb-3" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Enter as Patient
        </h2>
        <p className="text-gray-600 text-center">
          Access your medical records, prescriptions, and manage your health information.
        </p>
      </Link>
    </div>
  );
}
