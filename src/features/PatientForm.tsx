import React, { useState } from 'react';
import { addPatient } from '../services/apiService';
import { Demographics } from '../types';

interface PatientFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<Demographics['gender']>('Male');
  const [contact, setContact] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    try {
      await addPatient({ 
        name, 
        demographics: { dob, gender, contact } 
      });
      onSave();
    } catch (error) {
      console.error("Failed to add patient:", error);
      setError('Failed to save patient. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       {error && <p className="text-red-500 text-sm text-center -mt-2 mb-2">{error}</p>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
      </div>
      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input type="date" id="dob" value={dob} onChange={e => setDob(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
      </div>
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
        <select id="gender" value={gender} onChange={e => setGender(e.target.value as any)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
        <input type="tel" id="contact" value={contact} onChange={e => setContact(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        <button type="submit" disabled={isSaving} className="px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover disabled:bg-gray-400 transition-colors">
          {isSaving ? 'Saving...' : 'Save Patient'}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
