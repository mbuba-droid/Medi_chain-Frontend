import { Link } from "react-router-dom";
import { HeartPulse, ShieldCheck, FileText, Pill, Upload } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-6 py-12 text-center">
      {/* Hero Section */}
      <div className="mb-12">
        <HeartPulse size={80} className="text-blue-600 mb-5 mx-auto animate-pulse" />
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
          Welcome to <span className="text-blue-600">MediChain</span>
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
          Your digital health companion , securely manage your medical records,
          prescriptions, and lab results all in one place.
        </p>
      </div>

      {/* Why MediChain */}
      <h2 className="text-2xl font-semibold text-blue-700 mb-8">
        Why Choose MediChain?
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mb-14 text-left">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <ShieldCheck size={40} className="text-green-500 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">
            Secure Health Data
          </h3>
          <p className="text-gray-600 text-sm">
            Your health information is encrypted and private , accessible only
            by you and trusted professionals.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <FileText size={40} className="text-blue-500 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">
            Centralized Medical Records
          </h3>
          <p className="text-gray-600 text-sm">
            Keep all your medical documents and history neatly organized in
            one dashboard.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <Pill size={40} className="text-purple-500 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">
            Smart Prescription Tracking
          </h3>
          <p className="text-gray-600 text-sm">
            Stay on top of your medications , track doses, view prescriptions,
            and never miss a refill.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition md:col-span-3 md:max-w-md md:mx-auto">
          <Upload size={40} className="text-orange-500 mb-3 mx-auto" />
          <h3 className="font-semibold text-gray-800 mb-2 text-center">
            Easy Lab Uploads
          </h3>
          <p className="text-gray-600 text-sm text-center">
            Upload PDFs or images of your lab results and securely store them
            for future visits.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <Link
        to="/patient"
        className="bg-blue-600 text-white px-10 py-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition transform text-lg font-semibold"
      >
        Get Started
      </Link>

      {/* Footer */}
      <p className="text-gray-400 text-sm mt-10">
        Empowering patients. Simplifying healthcare.
      </p>
    </div>
  );
}
