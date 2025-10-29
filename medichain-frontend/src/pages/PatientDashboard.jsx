import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Stethoscope, FileText, Pill, Heart, Activity, CalendarDays } from "lucide-react";


const healthTips = [
  "Stay hydrated! Drinking at least 8 glasses of water daily can improve energy levels, skin health, and overall well-being.",
  "Aim for 30 minutes of moderate exercise most days of the week to maintain cardiovascular health.",
  "Include a variety of colorful fruits and vegetables in your diet for essential vitamins and antioxidants.",
  "Practice good sleep hygiene by maintaining a consistent sleep schedule and creating a restful environment.",
  "Take breaks during long periods of sitting to reduce the risk of musculoskeletal issues.",
  "Limit processed foods and added sugars to support better metabolic health.",
  "Schedule regular check-ups with your healthcare provider for preventive care.",
  "Practice stress-reduction techniques like deep breathing or meditation daily.",
  "Maintain a healthy weight through balanced nutrition and regular physical activity.",
  "Get vaccinated according to recommended schedules to protect against preventable diseases.",
  "Wash your hands frequently to prevent the spread of infections.",
  "Monitor your blood pressure regularly, especially if you have risk factors.",
  "Eat breakfast every day to kickstart your metabolism and maintain energy levels.",
  "Limit alcohol consumption to moderate levels or avoid it altogether for better health.",
  "Quit smoking to significantly reduce the risk of heart disease and cancer.",
  "Practice good posture to prevent back and neck pain.",
  "Stay socially connected with friends and family for mental health benefits.",
  "Learn CPR to be prepared for emergencies.",
  "Use sunscreen daily to protect against skin cancer.",
  "Get regular eye exams to maintain good vision.",
  "Floss daily to prevent gum disease and tooth decay.",
  "Stay up-to-date with health screenings based on your age and risk factors.",
  "Practice mindful eating by paying attention to hunger and fullness cues.",
  "Take stairs instead of elevators when possible for extra physical activity.",
  "Limit screen time before bed to improve sleep quality.",
  "Eat fatty fish like salmon twice a week for omega-3 benefits.",
  "Stay mentally active by learning new skills or hobbies.",
  "Monitor your caffeine intake to avoid sleep disturbances.",
  "Use ergonomic furniture to prevent workplace injuries.",
  "Practice gratitude daily to improve mental well-being.",
  "Get adequate vitamin D through sunlight or supplements if needed.",
  "Limit sodium intake to maintain healthy blood pressure.",
  "Eat whole grains for sustained energy and digestive health.",
  "Practice safe sex to prevent STIs and unplanned pregnancies.",
  "Stay informed about your family's medical history.",
  "Use relaxation techniques before bed to improve sleep quality.",
  "Eat probiotic-rich foods for gut health.",
  "Stay flexible with stretching exercises.",
  "Monitor your mental health and seek help when needed.",
  "Use herbs and spices to add flavor without extra calories.",
  "Stay current with dental cleanings every six months.",
  "Practice portion control to maintain a healthy weight.",
  "Get fresh air daily for better mood and respiratory health.",
  "Limit fried foods and choose healthier cooking methods.",
  "Stay positive and maintain an optimistic outlook.",
  "Use a pedometer to track daily steps.",
  "Eat slowly to allow your body to register fullness.",
  "Stay warm in cold weather to prevent hypothermia.",
  "Practice good hygiene to prevent illness.",
  "Get involved in community health initiatives.",
  "Monitor your cholesterol levels regularly.",
  "Eat nuts and seeds for healthy fats and protein.",
  "Stay informed about medication side effects.",
  "Practice forgiveness to reduce stress.",
  "Get regular hearing check-ups.",
  "Eat a rainbow of colors for diverse nutrients.",
  "Stay active during travel to prevent blood clots.",
  "Practice deep breathing during stressful situations.",
  "Use natural light to regulate your circadian rhythm.",
  "Stay hydrated during exercise.",
  "Monitor your blood sugar if at risk for diabetes.",
  "Eat mindfully without distractions.",
  "Stay connected with nature for stress relief.",
  "Practice good hand hygiene during flu season.",
  "Get adequate protein for muscle maintenance.",
  "Stay informed about local health resources.",
  "Practice yoga for flexibility and stress reduction.",
  "Eat seasonal produce for optimal nutrition.",
  "Stay motivated with health goals and rewards.",
  "Monitor your bone health with calcium and vitamin D.",
  "Practice safe lifting techniques to prevent injury.",
  "Stay informed about emerging health research.",
  "Eat fermented foods for gut health benefits.",
  "Stay flexible with regular stretching routines.",
  "Practice self-compassion for better mental health.",
  "Get regular skin cancer screenings.",
  "Eat anti-inflammatory foods like berries and leafy greens.",
  "Stay active with household chores.",
  "Monitor your thyroid function if symptoms arise.",
  "Practice gratitude journaling.",
  "Stay hydrated with herbal teas.",
  "Eat sustainably for environmental and health benefits.",
  "Stay informed about global health issues.",
  "Practice progressive muscle relaxation.",
  "Get adequate magnesium for muscle and nerve function.",
  "Stay connected with healthcare providers.",
  "Eat whole foods for better nutrient absorption.",
  "Stay positive during recovery from illness.",
  "Monitor your iron levels for energy.",
  "Practice mindfulness meditation.",
  "Stay warm and dry to prevent colds.",
  "Eat complex carbohydrates for sustained energy.",
  "Stay informed about allergy management.",
  "Practice good ergonomics at your desk.",
  "Get regular foot exams if diabetic.",
  "Eat foods rich in fiber for digestive health.",
  "Stay motivated with a health buddy.",
  "Monitor your potassium levels.",
  "Practice visualization for stress relief.",
  "Stay informed about genetic testing options.",
  "Eat organic when possible to reduce chemical exposure.",
  "Stay active with gardening or yard work.",
  "Monitor your liver function with regular tests.",
  "Practice loving-kindness meditation.",
  "Stay hydrated with electrolyte balance.",
  "Eat foods high in vitamin C for immunity.",
  "Stay informed about mental health resources.",
  "Practice tai chi for balance and calm.",
  "Get adequate zinc for immune function.",
  "Stay connected with support groups.",
  "Eat mindfully to prevent overeating.",
  "Stay positive with affirmations.",
  "Monitor your hormone levels if needed.",
  "Practice aromatherapy for relaxation.",
  "Stay informed about vaccine developments.",
  "Eat foods rich in antioxidants.",
  "Stay active with dancing.",
  "Monitor your kidney function.",
  "Practice journaling for emotional health.",
  "Stay hydrated with coconut water."
];

export default function PatientDashboard() {
  const [currentTip, setCurrentTip] = useState(0);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prevTip) => {
        const newTip = (prevTip + 1) % healthTips.length;
        return newTip;
      });
    }, 10000); // Change tip every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Floating Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
          notification.type === 'success'
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-yellow-100 border border-yellow-400 text-yellow-700'
        }`}>
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'
            }`}>
              <span className="text-white text-sm font-bold">
                {notification.type === 'success' ? '✓' : '!'}
              </span>
            </div>
            <p className="text-sm font-medium">{notification.message}</p>
            <button
              onClick={() => setNotification(null)}
              className="ml-3 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white px-8 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-4">
          <Stethoscope className="text-white" size={32} />
          <h1 className="text-2xl font-bold text-white">MediChain Patient Portal</h1>
        </div>
        <div className="flex space-x-8">
          <Link to="/medical-records" className="text-white hover:text-blue-200 transition-colors font-medium">
            Medical Records
          </Link>
          <Link to="/patient-management" className="text-white hover:text-blue-200 transition-colors font-medium">
            Management
          </Link>
          <Link to="/" className="text-white hover:text-blue-200 transition-colors font-medium">
            Return Home
          </Link>
          <Link to="/" className="text-red-300 hover:text-red-100 transition-colors font-medium">
            Logout
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col flex-grow px-6 py-12">
        {/* Heart Monitor Line */}
        <div className="flex justify-center items-center mb-6">
          <div className="relative w-full max-w-lg h-20 bg-black border-2 border-gray-600 rounded overflow-hidden mr-4">
            <svg className="absolute w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
              <path
                d="M0,40 L50,40 L60,20 L70,60 L80,30 L90,50 L100,40 L150,40 L160,15 L170,65 L180,25 L190,55 L200,35 L250,35 L260,10 L270,70 L280,20 L290,60 L300,30 L350,30 L360,5 L370,75 L380,15 L390,65 L400,40"
                stroke="#ff0000"
                strokeWidth="2"
                fill="none"
                style={{animation: 'continuousWave 3s linear infinite'}}
              />
            </svg>
          </div>
          <Heart className="text-red-500" size={40} style={{animation: 'heartbeat 1.5s ease-in-out infinite'}} />
          <style>
            {`
              @keyframes continuousWave {
                0% { stroke-dashoffset: 400; }
                100% { stroke-dashoffset: 0; }
              }
              path {
                stroke-dasharray: 400;
              }
              @keyframes heartbeat {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
              }
            `}
          </style>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome Back, Patient!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take control of your health journey. Access records, manage appointments, and stay informed about your well-being.
          </p>
        </div>



        {/* Main Actions */}
        <div className="grid gap-8 md:grid-cols-4 w-full max-w-6xl mx-auto mb-12">
          {/* Appointments */}
          <Link
            to="/appointments"
            className="group flex flex-col items-center bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-white"
          >
           <CalendarDays size={56} className="mb-4 group-hover:animate-pulse" />
           <h3 className="text-2xl font-bold mb-3">Appointments</h3>
            <p className="text-center opacity-90">Schedule and track upcoming medical visits. Stay on top of your  healthcare timeline.</p>

          </Link>
          {/* Medical Records */}
          <Link
            to="/medical-records"
            className="group flex flex-col items-center bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-white"
          >
            <FileText size={56} className="mb-4 group-hover:animate-pulse" />
            <h3 className="text-2xl font-bold mb-3">
              Medical Records
            </h3>
            <p className="text-center opacity-90">
              Comprehensive history of diagnoses, treatments, and lab results for informed decision-making.
            </p>
          </Link>

          {/* Patient Management */}
          <Link
            to="/patient-management"
            className="group flex flex-col items-center bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-white"
          >
            <Stethoscope size={56} className="mb-4 group-hover:animate-pulse" />
            <h3 className="text-2xl font-bold mb-3">
              Patient Management
            </h3>
            <p className="text-center opacity-90">
              Manage operations, scans, and procedures with detailed tracking and updates.
            </p>
          </Link>
          

          {/* Prescriptions */}
          <Link
            to="/prescriptions"
            className="group flex flex-col items-center bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-white"
          >
            <Pill size={56} className="mb-4 group-hover:animate-pulse" />
            <h3 className="text-2xl font-bold mb-3">
              Prescriptions
            </h3>
            <p className="text-center opacity-90">
              Current and historical medication details with dosage and refill information.
            </p>
          </Link>
        </div>

        {/* Health Tip */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl border-l-4 border-yellow-500">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">💡 Health Tip of the Day</h4>
            <p className="text-gray-700">
              {healthTips[currentTip]}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">MediChain Patient Portal</h4>
              <p className="text-blue-100 text-sm">Empowering your health journey with technology</p>
            </div>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2 animate-bounce">
                <Stethoscope className="text-white" size={20} />
                <span className="text-sm">Health First</span>
              </div>
              <div className="flex items-center space-x-2 animate-pulse">
                <Activity className="text-white" size={20} />
                <span className="text-sm">Stay Active</span>
              </div>
              <div className="flex items-center space-x-2 animate-bounce" style={{animationDelay: '0.5s'}}>
                <Pill className="text-white" size={20} />
                <span className="text-sm">Medication Reminders</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-blue-500 text-center">
            <p className="text-blue-100 text-sm">
              © 2025 MediChain. All rights reserved. |{' '}
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="text-white hover:text-blue-200 underline transition-colors"
              >
                Privacy Policy
              </button>{' '}
              |{' '}
              <button
                onClick={() => setShowTermsModal(true)}
                className="text-white hover:text-blue-200 underline transition-colors"
              >
                Terms of Service
              </button>
            </p>
          </div>
        </div>
      </footer>



      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Privacy Policy</h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-6 text-gray-700">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">1. Information We Collect</h4>
                <p className="mb-2">MediChain collects personal health information including:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Medical records and treatment history</li>
                  <li>Appointment and prescription data</li>
                  <li>Vital signs and health metrics</li>
                  <li>Personal identification information</li>
                  <li>Communication records with healthcare providers</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">2. How We Use Your Information</h4>
                <p className="mb-2">Your health information is used to:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Provide comprehensive healthcare services</li>
                  <li>Coordinate care between healthcare providers</li>
                  <li>Send appointment reminders and medication alerts</li>
                  <li>Generate health reports and analytics</li>
                  <li>Improve our services and develop new features</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">3. Information Sharing</h4>
                <p className="mb-2">We share your information only in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>With your explicit consent</li>
                  <li>With authorized healthcare providers for treatment</li>
                  <li>As required by law or legal processes</li>
                  <li>In emergency situations to protect health and safety</li>
                  <li>With trusted third-party service providers (anonymized)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">4. Data Security</h4>
                <p className="text-sm">
                  MediChain employs industry-leading security measures including encryption, secure servers,
                  regular security audits, and access controls to protect your personal health information.
                  All data transmission is encrypted using SSL/TLS protocols.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">5. Your Rights</h4>
                <p className="mb-2">You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Access your personal health information</li>
                  <li>Request corrections to inaccurate data</li>
                  <li>Request deletion of your information</li>
                  <li>Withdraw consent for data processing</li>
                  <li>Receive a copy of your data in portable format</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">6. Data Retention</h4>
                <p className="text-sm">
                  Medical records are retained according to healthcare regulations and best practices.
                  Personal data is kept only as long as necessary for the purposes outlined in this policy
                  or as required by law.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">7. Cookies and Tracking</h4>
                <p className="text-sm">
                  We use cookies and similar technologies to improve your experience, remember your preferences,
                  and analyze platform usage. You can control cookie settings through your browser.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">8. International Data Transfers</h4>
                <p className="text-sm">
                  Your data may be processed in countries other than your own. We ensure appropriate safeguards
                  are in place to protect your information during international transfers.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">9. Updates to This Policy</h4>
                <p className="text-sm">
                  This privacy policy may be updated periodically. We will notify you of significant changes
                  through the platform or via email. Continued use of our services constitutes acceptance
                  of the updated policy.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">10. Contact Us</h4>
                <p className="text-sm">
                  If you have questions about this privacy policy or our data practices, please contact us at:
                  <br />
                  Email: privacy@medichain.com
                  <br />
                  Phone: 0722 222 222- MEDI-CHAIN
                  <br />
                  Address: Moringa School, Ngong Lane Plaza, Nairobi
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500">
                  Last updated: January 2025
                  <br />
                  This privacy policy complies with HIPAA, GDPR, and other applicable data protection regulations.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Terms of Service</h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-6 text-gray-700">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h4>
                <p className="text-sm">
                  By accessing and using the MediChain Patient Portal, you accept and agree to be bound by the terms
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">2. Use License</h4>
                <p className="mb-2">Permission is granted to temporarily access the materials on MediChain's platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software contained on the platform</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">3. Medical Disclaimer</h4>
                <p className="text-sm">
                  The information provided through MediChain is for informational purposes only and is not intended
                  as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of
                  your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">4. User Responsibilities</h4>
                <p className="mb-2">As a user of this platform, you agree to:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Provide accurate and complete information about your health</li>
                  <li>Keep your login credentials secure and confidential</li>
                  <li>Report any unauthorized access to your account immediately</li>
                  <li>Use the platform only for lawful purposes related to your healthcare</li>
                  <li>Not share your account with others or allow unauthorized access</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">5. Privacy and Data Protection</h4>
                <p className="text-sm">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the platform,
                  to understand our practices regarding the collection and use of your personal health information.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">6. Account Termination</h4>
                <p className="text-sm">
                  We may terminate or suspend your account and bar access to the platform immediately, without prior notice or liability,
                  under our sole discretion, for conduct that we believe violates these Terms of Service or is harmful to other users,
                  us, or third parties, or for any other reason.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">7. Limitation of Liability</h4>
                <p className="text-sm">
                  In no event shall MediChain or its suppliers be liable for any damages (including, without limitation,
                  damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                  to use the platform, even if MediChain or a MediChain authorized representative has been notified orally
                  or in writing of the possibility of such damage.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">8. Accuracy of Materials</h4>
                <p className="text-sm">
                  The materials appearing on MediChain platform could include technical, typographical, or photographic errors.
                  MediChain does not warrant that any of the materials on its platform are accurate, complete, or current.
                  MediChain may make changes to the materials contained on its platform at any time without notice.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">9. Modifications</h4>
                <p className="text-sm">
                  MediChain may revise these terms of service for its platform at any time without notice. By using this platform,
                  you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">10. Governing Law</h4>
                <p className="text-sm">
                  These terms and conditions are governed by and construed in accordance with the laws of Kenya and you irrevocably
                  submit to the exclusive jurisdiction of the courts in that state or location.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500">
                  Last updated: January 2025
                  <br />
                  These terms of service are designed to comply with Kenyan healthcare regulations and international standards.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowTermsModal(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
