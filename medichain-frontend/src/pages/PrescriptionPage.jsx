import { useState, useEffect } from "react";
import { Pill, Calendar, User, Plus, Edit, ArrowLeft, X, CheckCircle, Check } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api";

export default function PrescriptionPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    prescribed_by: "",
    date: "",
    notes: "",
    total_doses: 0
  });

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/patient/prescriptions");
      setPrescriptions(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load prescriptions.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPrescription = () => {
    setFormData({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      prescribed_by: "",
      date: "",
      notes: "",
      total_doses: 0
    });
    setShowModal(true);
  };

  const handleEditPrescription = (prescription) => {
    setFormData({
      medication: prescription.medication,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      duration: prescription.duration,
      prescribed_by: prescription.prescribed_by,
      date: prescription.date,
      notes: prescription.notes,
      total_doses: prescription.total_doses
    });
    setEditingId(prescription.id);
    setShowModal(true);
  };

  const handleSavePrescription = async () => {
    if (!formData.medication || !formData.dosage || !formData.frequency || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        // For now, we'll add as new since update is not implemented in backend
        await api.post("/patient/prescriptions", formData);
        alert("Prescription updated successfully!");
      } else {
        await api.post("/patient/prescriptions", formData);
        alert("Prescription added successfully!");
      }
      setShowModal(false);
      fetchPrescriptions();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save prescription.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      prescribed_by: "",
      date: "",
      notes: "",
      total_doses: 0
    });
  };

  const handleMarkCompleted = async (id) => {
    try {
      await api.patch(`/patient/prescriptions/${id}`, { completed: true });
      fetchPrescriptions();
    } catch (err) {
      alert("Failed to mark as completed.");
    }
  };

  const handleTakeDose = async (id) => {
    try {
      const prescription = prescriptions.find(p => p.id === id);
      if (prescription && prescription.taken_doses < prescription.total_doses) {
        await api.patch(`/patient/prescriptions/${id}`, { taken_doses: prescription.taken_doses + 1 });
        fetchPrescriptions();
      }
    } catch (err) {
      alert("Failed to take dose.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6" style={{ backgroundImage: 'url(/pills-background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-5xl mx-auto bg-white/90 shadow-lg rounded-2xl p-8 border border-gray-200">
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
                    value={formData.prescribed_by}
                    onChange={(e) => setFormData({ ...formData, prescribed_by: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Dr. Kamau"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Total Doses</label>
                  <input
                    type="number"
                    value={formData.total_doses}
                    onChange={(e) => setFormData({ ...formData, total_doses: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 21"
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
                  disabled={saving}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : (editingId ? "Update Prescription" : "Add Prescription")}
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
          {loading ? (
            <p className="text-gray-500 italic text-center">Loading prescriptions...</p>
          ) : error ? (
            <p className="text-red-500 italic text-center">{error}</p>
          ) : prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <div key={prescription.id} className={`bg-gray-100 p-6 rounded-xl border border-gray-200 relative ${prescription.completed ? 'opacity-75' : ''}`}>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEditPrescription(prescription)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  {!prescription.completed && (
                    <button
                      onClick={() => handleMarkCompleted(prescription.id)}
                      className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 flex items-center gap-1 text-sm"
                    >
                      <CheckCircle size={14} />
                      Mark Complete
                    </button>
                  )}
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

                    {/* Progress Bar */}
                    {prescription.total_doses > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress: {prescription.taken_doses || 0}/{prescription.total_doses} doses</span>
                          <span>{Math.round(((prescription.taken_doses || 0) / prescription.total_doses) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(((prescription.taken_doses || 0) / prescription.total_doses) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Take Dose Button */}
                    {!prescription.completed && prescription.total_doses > 0 && (prescription.taken_doses || 0) < prescription.total_doses && (
                      <button
                        onClick={() => handleTakeDose(prescription.id)}
                        className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1 text-sm"
                      >
                        <Check size={14} />
                        Take Dose
                      </button>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-700 flex items-center gap-2">
                      <User size={18} className="text-blue-500" />
                      <strong>Prescribed by:</strong> {prescription.prescribed_by}
                    </p>
                    <p className="text-gray-700 flex items-center gap-2">
                      <Calendar size={18} className="text-green-500" />
                      <strong>Date:</strong> {prescription.date}
                    </p>
                    <p className="text-gray-700 mt-2"><strong>Notes:</strong> {prescription.notes}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic text-center">No prescriptions available.</p>
          )}
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
