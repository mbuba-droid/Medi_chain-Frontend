import { Link } from "react-router-dom";
import { Stethoscope, Users, Hospital } from "lucide-react";

export default function MedicLandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-6 py-12">
      <Hospital size={64} className="text-blue-600 mb-4" />
      <h1 className="text-4xl font-bold text-blue-700 mb-3 text-center">
        Welcome to MediChain — Medics Portal
      </h1>
      <p className="text-gray-600 mb-10 text-center max-w-md">
        Manage patient data, medical records, and collaborate with caregivers to
        improve healthcare delivery.
      </p>

      {/* Role Selection for Medics */}
      <div className="grid gap-6 md:grid-cols-2 w-full max-w-4xl">
        {/* Medical Officer */}
        <Link
          to="/officer"
          className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all border border-gray-200"
        >
          <Stethoscope size={48} className="text-green-500 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Enter as Medical Officer
          </h2>
          <p className="text-gray-600 text-center">
            View and update patient medical records, manage healthcare data.
          </p>
        </Link>

        {/* Caregiver */}
        <Link
          to="/caregiver"
          className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all border border-gray-200"
        >
          <Users size={48} className="text-purple-500 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Enter as Caregiver
          </h2>
          <p className="text-gray-600 text-center">
            Manage prescriptions, set medication reminders, and track patient
            progress.
          </p>
        </Link>
      </div>
    </div>
  );
}
