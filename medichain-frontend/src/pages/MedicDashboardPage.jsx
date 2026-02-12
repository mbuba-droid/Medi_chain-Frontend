import { Link } from "react-router-dom";
import { FileText, Stethoscope } from "lucide-react";

export default function MedicalDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Medical Dashboard
      </h1>
      <p className="text-gray-600 mb-10 text-center max-w-md">
        Manage patients, view medical records, and handle prescriptions.
      </p>

      <div className="grid gap-6 md:grid-cols-2 w-full max-w-3xl">
        {/* View Medical Records */}
        <Link
          to="/medical-records"
          className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-200"
        >
          <FileText size={48} className="text-blue-500 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            View Medical Records
          </h2>
          <p className="text-gray-600 text-center">
            Access and review patient medical histories and reports.
          </p>
        </Link>

        {/* Patient Management */}
        <Link
          to="/patient-management"
          className="flex flex-col items-center bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-200"
        >
          <Stethoscope size={48} className="text-green-500 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Patient Management
          </h2>
          <p className="text-gray-600 text-center">
            View and manage patient information, appointments, and operations.
          </p>
        </Link>
      </div>
    </div>
  );
}
