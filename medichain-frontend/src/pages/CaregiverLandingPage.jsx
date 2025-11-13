// src/pages/CaregiverLandingPage.jsx
import { useNavigate } from "react-router-dom";
import { Stethoscope, Pill, CalendarDays, Heart } from "lucide-react";

export default function CaregiverLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* Header */}
      <header className="w-full bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Heart className="text-teal-600" size={32} />
              <div>
                <h1 className="text-xl font-bold text-teal-600">MediChain</h1>
                <p className="text-sm text-gray-500">Caregiver Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-teal-600 transition-colors font-medium"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/caregiver-login")}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Login
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12 max-w-3xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome, Caregiver!</h2>
          <p className="text-lg text-gray-700 mb-4">
            As a caregiver, you play a vital role in helping patients maintain their health.
            Your responsibilities include ensuring they take their medications on time,
            managing their appointments, and providing support in their daily health routines.
          </p>
          <p className="text-lg text-gray-700">
            By staying organized and attentive, you help patients achieve better health outcomes
            and make it easier for them to follow their care plans. Your role is essential in
            creating a safe and healthy environment for those you care for.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl w-full mb-12">
          <div className="flex flex-col items-center bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 rounded-2xl shadow-lg text-white">
            <Pill size={56} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">Medication Management</h3>
            <p className="text-center opacity-90">
              Keep track of medications, dosages, and schedules. Ensure patients take their prescriptions
              correctly to maintain optimal health and prevent complications.
            </p>
          </div>

          <div className="flex flex-col items-center bg-gradient-to-br from-teal-500 to-teal-600 p-8 rounded-2xl shadow-lg text-white">
            <CalendarDays size={56} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">Appointments</h3>
            <p className="text-center opacity-90">
              Schedule and manage patient appointments efficiently. Help patients stay on top of their
              healthcare timeline and follow-up visits.
            </p>
          </div>

          <div className="flex flex-col items-center bg-gradient-to-br from-cyan-500 to-cyan-600 p-8 rounded-2xl shadow-lg text-white md:col-span-2">
            <Stethoscope size={56} className="mb-4" />
            <h3 className="text-2xl font-bold mb-2">Patient Support</h3>
            <p className="text-center opacity-90">
              Offer guidance, encouragement, and assistance to patients in their daily health routines.
              Your support can improve adherence to care plans and overall well-being.
            </p>
          </div>
        </div>

        {/* Get Started Button */}
        <button
          onClick={() => navigate("/caregiver-login")}
          className="bg-teal-600 text-white px-10 py-3 rounded-2xl font-semibold hover:bg-teal-700 transition-colors"
        >
          Get Started
        </button>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-teal-50 to-cyan-50 border-t border-teal-200 mt-16 animate-fade-in">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2 animate-slide-up">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="text-teal-600 animate-pulse" size={24} />
                <span className="text-lg font-bold text-teal-600">MediChain</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Empowering caregivers and patients with secure, comprehensive healthcare management solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-teal-600 transition-all duration-300 hover:scale-110 hover:rotate-12">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-teal-600 transition-all duration-300 hover:scale-110 hover:-rotate-12">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-teal-600 transition-all duration-300 hover:scale-110 hover:rotate-12">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="animate-slide-up animation-delay-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-600 hover:text-teal-600 transition-all duration-300 hover:translate-x-1 text-sm">Home</a></li>
                <li><a href="/caregiver-login" className="text-gray-600 hover:text-teal-600 transition-all duration-300 hover:translate-x-1 text-sm">Caregiver Login</a></li>
                <li><a href="/patient" className="text-gray-600 hover:text-teal-600 transition-all duration-300 hover:translate-x-1 text-sm">Patient Portal</a></li>
                <li><a href="/emergency-info" className="text-gray-600 hover:text-teal-600 transition-all duration-300 hover:translate-x-1 text-sm">Emergency Info</a></li>
              </ul>
            </div>

            <div className="animate-slide-up animation-delay-400">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-all duration-300 hover:translate-x-1 text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-all duration-300 hover:translate-x-1 text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-all duration-300 hover:translate-x-1 text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-all duration-300 hover:translate-x-1 text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-teal-200 mt-8 pt-8 text-center animate-fade-in animation-delay-600">
            <p className="text-gray-500 text-sm">
              © 2025 MediChain. All rights reserved. | Empowering healthcare through technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
