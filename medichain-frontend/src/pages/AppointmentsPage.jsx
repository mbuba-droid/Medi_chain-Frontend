import { useState, useEffect } from "react";
import { Bell, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  // Load saved appointments
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(saved);
  }, []);

  // Save new appointment
  const handleAddAppointment = () => {
    if (!date || !time || !note.trim()) {
      alert("Please fill in all fields before adding an appointment.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      date,
      time,
      note,
    };

    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));

    setDate("");
    setTime("");
    setNote("");
    alert("Appointment added successfully!");
  };

  // Delete appointment
  const handleDelete = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-6" style={{backgroundImage: 'url("/ChatGPT Image Oct 29, 2025, 04_42_54 PM.png")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      <div className="absolute inset-0 bg-white bg-opacity-90"></div>
      <div className="relative z-10 w-full flex flex-col items-center">
      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-700 mb-4 flex items-center gap-3">
        <CalendarDays size={40} /> Appointments
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-lg">
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

        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center">No appointments scheduled yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {appointments.map((a) => (
              <li key={a.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{a.note}</p>
                  <p className="text-gray-500 text-sm">
                    {a.date} — {a.time}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-500 hover:text-red-700 transition text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Back to Dashboard */}
      <Link
        to="/patient-dashboard"
        className="mt-10 text-blue-600 hover:underline font-medium"
      >
        ← Back to Dashboard
      </Link>
      </div>
    </div>
  );
}
