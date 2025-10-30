import { useState, useEffect } from "react";
import { Bell, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorText, setErrorText] = useState("");

  // Load appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/patient/appointments");
        setAppointments(response.data);
      } catch (err) {
        setError("Failed to load appointments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Save new appointment
  const handleAddAppointment = async () => {
    if (!date || !time || !note.trim()) {
      setErrorText("Please fill in all fields before adding an appointment.");
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
      return;
    }

    try {
      const scheduledTime = `${date} ${time}:00`; // Combine date and time
      await api.post("/patient/appointments", {
        description: note,
        scheduled_time: scheduledTime,
        status: "pending"
      });

      // Refresh appointments
      const response = await api.get("/patient/appointments");
      setAppointments(response.data);

      setDate("");
      setTime("");
      setNote("");
      setMessageText("Appointment added successfully!");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } catch (err) {
      setErrorText("Failed to add appointment");
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
      console.error(err);
    }
  };

  // Delete appointment
  const handleDelete = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-6" style={{backgroundImage: 'url("/fi2JhRueSBGy5RFEh4w0_appointment.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30"></div>
      {showMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {messageText}
        </div>
      )}
      {showErrorMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {errorText}
        </div>
      )}
      <div className="relative z-10 w-full flex flex-col items-center">
      {/* Header */}
      <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
        <CalendarDays size={40} /> Appointments
      </h1>
      <p className="text-white mb-8 text-center max-w-lg">
        Schedule your next hospital visits and manage all your appointments conveniently in one place.
      </p>

      {/* Add Appointment */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Add Appointment</h2>

        <label className="block text-gray-700 mb-1 font-medium">Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-3 rounded-md mb-4"
        />

        <label className="block text-gray-700 mb-1 font-medium">Select Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border p-3 rounded-md mb-4"
        />

        <label className="block text-gray-700 mb-1 font-medium">Appointment Note</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g., Dental check-up with Dr. Kamau"
          className="w-full border p-3 rounded-md mb-4"
        />

        <button
          onClick={handleAddAppointment}
          className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Add Appointment
        </button>
      </div>

      {/* Appointment List */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
          <Bell size={20} /> Upcoming Appointments
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center">Loading appointments...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-500 text-center">No appointments scheduled yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {appointments.map((a) => (
              <li key={a.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{a.description}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(a.scheduled_time).toLocaleDateString()} — {new Date(a.scheduled_time).toLocaleTimeString()}
                  </p>
                  <p className="text-gray-400 text-xs">Status: {a.status}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Back to Dashboard */}
      <Link
        to="/patient-dashboard"
        className="mt-10 text-white hover:underline font-medium"
      >
        ← Back to Dashboard
      </Link>
      </div>
    </div>
  );
}
