import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function PatientPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    dateOfBirth: '',
    firstAidProcedure: '',
    allergies: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    caregiverName: '',
    caregiverPhone: ''
  });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/register', {
        full_name: registerData.fullName,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
        date_of_birth: registerData.dateOfBirth,
        first_aid_procedure: registerData.firstAidProcedure,
        allergies: registerData.allergies,
        next_of_kin_name: registerData.nextOfKinName,
        next_of_kin_phone: registerData.nextOfKinPhone,
        caregiver_name: registerData.caregiverName,
        caregiver_phone: registerData.caregiverPhone
      });

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Patient Registration</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleRegisterSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={registerData.fullName}
              onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="+254700000000"
              value={registerData.phone}
              onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              value={registerData.dateOfBirth}
              onChange={(e) => setRegisterData({ ...registerData, dateOfBirth: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">First Aid Procedure</label>
            <textarea
              placeholder="Any specific first aid procedures..."
              value={registerData.firstAidProcedure}
              onChange={(e) => setRegisterData({ ...registerData, firstAidProcedure: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Allergies</label>
            <textarea
              placeholder="List any allergies..."
              value={registerData.allergies}
              onChange={(e) => setRegisterData({ ...registerData, allergies: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Next of Kin Name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              value={registerData.nextOfKinName}
              onChange={(e) => setRegisterData({ ...registerData, nextOfKinName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Next of Kin Phone</label>
            <input
              type="tel"
              placeholder="+254700000000"
              value={registerData.nextOfKinPhone}
              onChange={(e) => setRegisterData({ ...registerData, nextOfKinPhone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Caregiver Name</label>
            <input
              type="text"
              placeholder="Dr. Smith"
              value={registerData.caregiverName}
              onChange={(e) => setRegisterData({ ...registerData, caregiverName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Caregiver Phone</label>
            <input
              type="tel"
              placeholder="+254700000000"
              value={registerData.caregiverPhone}
              onChange={(e) => setRegisterData({ ...registerData, caregiverPhone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
