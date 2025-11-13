import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PatientPage from "./pages/PatientPage";
import PatientManagement from "./pages/PatientManagement";
import PatientRecords from "./pages/PatientRecords";
import PatientLoginPage from "./pages/PatientLogin";
import PatientDashboard from "./pages/PatientDashboard";
import PrescriptionPage from "./pages/PrescriptionPage";
import MedicalRecords from "./pages/MedicalRecords";
import AppointmentsPage from "./pages/AppointmentsPage";
import EmergencyInfo from "./pages/EmergencyInfo";
import EmergencyInfoLandingPage from "./pages/EmergencyInfoLoadingPage";
import CaregiverLandingPage from "./pages/CaregiverLandingPage";
import CaregiverLoginPage from "./pages/CaregiverLoginPage";
import CaregiverDashboard from "./pages/CaregiverDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/patient-management" element={<PatientManagement />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/login" element={<PatientLoginPage/>} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/prescriptions" element={<PrescriptionPage />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/emergency-info" element={<EmergencyInfo />} />
        <Route path="/emergency-info/:patientId" element={<EmergencyInfoLandingPage />} />
        <Route path="/caregiver" element={<CaregiverLandingPage />} />
        <Route path="/caregiver-login" element={<CaregiverLoginPage />} />
        <Route path="/caregiver-dashboard" element={<CaregiverDashboard />} />
      </Routes>
    </Router>
  );
}
