import { useState } from "react";
import { Pill, Calendar, User, Plus, Edit, ArrowLeft, X, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrescriptionPage() {
  // Placeholder data (you’ll later replace this with API data)
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      medication: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times a day",
      duration: "7 days",
      prescribedBy: "Dr. Kamau",
      date: "2024-10-01",
      notes: "Take with food to avoid stomach upset.",
      completed: false
    },
    {
      id: 2,
      medication: "Ibuprofen",
      dosage: "200mg",
      frequency: "As needed",
      duration: "10 days",
      prescribedBy: "Dr. Njeri",
      date: "2024-09-15",
      notes: "For pain relief, not to exceed 4 tablets per day.",
      completed: false
    },
    {
      id: 3,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice a day",
      duration: "Ongoing",
      prescribedBy: "Dr. Patel",
      date: "2024-08-20",
      notes: "Monitor blood sugar levels regularly.",
      completed: true
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    prescribedBy: "",
    date: "",
    notes: "",
    completed: false
  });

  const handleAddPrescription = () => {
    setFormData({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      prescribedBy: "",
      date: "",
      notes: "",
      completed: false
    });
    setShowModal(true);
  };

  const handleEditPrescription = (prescription) => {
    setFormData(prescription);
    setEditingId(prescription.id);
    setShowModal(true);
  };

  const handleSavePrescription = () => {
    if (editingId) {
      setPrescriptions(prescriptions.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
      setEditingId(null);
    } else {
      const newPrescription = { ...formData, id: Date.now() };
      setPrescriptions([...prescriptions, newPrescription]);
      setShowModal(false);
    }
    setFormData({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      prescribedBy: "",
      date: "",
      notes: ""
    });
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      prescribedBy: "",
      date: "",
      notes: "",
      completed: false
    });
  };

  const handleMarkCompleted = (id) => {
    setPrescriptions(prescriptions.map(p =>
      p.id === id ? { ...p, completed: !p.completed } : p
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Pill className="text-green-600" size={36} />
            <h1 className="text-3xl font-bold text-gray-800">Patient Prescriptions</h1>
          </div>
          <button
            onClick={handleAddPrescription}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={18} />
            Add Prescription
          </button>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingId ? "Edit Prescription" : "Add New Prescription"}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Medication</label>
                  <input
                    type="text"
                    value={formData.medication}
                    onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Amoxicillin"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Dosage</label>
                  <input
                    type="text"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 500mg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Frequency</label>
                  <input
                    type="text"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 3 times a day"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 7 days"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Prescribed By</label>
                  <input
                    type="text"
                    value={formData.prescribedBy}
                    onChange={(e) => setFormData({ ...formData, prescribedBy: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Dr. Kamau"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Additional notes..."
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleSavePrescription}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  {editingId ? "Update Prescription" : "Add Prescription"}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Prescriptions List */}
        <div className="space-y-6">
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className={`bg-gray-100 p-6 rounded-xl border border-gray-200 relative ${prescription.completed ? 'opacity-75' : ''}`}>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => handleEditPrescription(prescription)}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 flex items-center gap-1 text-sm"
                >
                  <Edit size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleMarkCompleted(prescription.id)}
                  className={`px-3 py-1 rounded-md flex items-center gap-1 text-sm ${
                    prescription.completed
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  <CheckCircle size={14} />
                  {prescription.completed ? 'Completed' : 'Mark Complete'}
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4 pr-48">
                <div>
                  <h2 className={`text-xl font-semibold mb-2 ${prescription.completed ? 'line-through text-gray-600' : 'text-gray-800'}`}>
                    {prescription.medication}
                    {prescription.completed && <span className="ml-2 text-green-600 text-sm">(Completed)</span>}
                  </h2>
                  <p className="text-gray-700"><strong>Dosage:</strong> {prescription.dosage}</p>
                  <p className="text-gray-700"><strong>Frequency:</strong> {prescription.frequency}</p>
                  <p className="text-gray-700"><strong>Duration:</strong> {prescription.duration}</p>
                </div>
                <div>
                  <p className="text-gray-700 flex items-center gap-2">
                    <User size={18} className="text-blue-500" />
                    <strong>Prescribed by:</strong> {prescription.prescribedBy}
                  </p>
                  <p className="text-gray-700 flex items-center gap-2">
                    <Calendar size={18} className="text-green-500" />
                    <strong>Date:</strong> {prescription.date}
                  </p>
                  <p className="text-gray-700 mt-2"><strong>Notes:</strong> {prescription.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {prescriptions.length === 0 && (
          <p className="text-gray-500 italic text-center">No prescriptions available.</p>
        )}

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link
            to="/patient-dashboard"
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 inline-flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
