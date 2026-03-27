import { Link } from "react-router-dom";
import { Stethoscope, FileText, Pill } from "lucide-react";

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Patient Dashboard</h1>
        <div className="flex space-x-6">
          <Link to="/medical-records" className="hover:text-blue-200">
            Medical Records
          </Link>
          <Link to="/patient-management" className="hover:text-blue-200">
            Management
          </Link>
          <Link to="/" className="hover:text-blue-200">
            Return Home
          </Link>
          <Link to="/" className="hover:text-blue-200">
            Logout
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-6 py-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center">
          Welcome Back! Manage Your Health
        </h2>

        <div className="grid gap-6 md:grid-cols-3 w-full max-w-4xl">
          {/* Medical Records */}
          <Link
            to="/medical-records"
            className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all border border-gray-200"
          >
            <FileText size={48} className="text-blue-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              View Medical Records
            </h3>
            <p className="text-gray-600 text-center">
              Access your complete medical history, diagnoses, and lab results.
            </p>
          </Link>

          {/* Patient Management */}
          <Link
            to="/patient-management"
            className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all border border-gray-200"
          >
            <Stethoscope size={48} className="text-purple-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Patient Management
            </h3>
            <p className="text-gray-600 text-center">
              Update and review operations, scans, and medical procedures.
            </p>
          </Link>

          {/* Prescriptions */}
          <Link
            to="/prescriptions"
            className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all border border-gray-200"
          >
            <Pill size={48} className="text-green-500 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Prescriptions
            </h3>
            <p className="text-gray-600 text-center">
              View your current and past medication prescriptions.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
