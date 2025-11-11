import React, { useState } from 'react';
import { addPrescription } from '../services/apiService';
import { Patient } from '../types';

interface PrescriptionFormProps {
  patients: Patient[];
  onSave: () => void;
  onCancel: () => void;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ patients, onSave, onCancel }) => {
  const [patient_id, setPatientId] = useState(patients[0]?.id || '');
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [start_date, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [end_date, setEndDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient_id) {
        setError("Please select a patient.");
        return;
    };
    setIsSaving(true);
    setError('');
    try {
      await addPrescription({
        patient_id,
        medication,
        dosage,
        frequency,
        start_date,
        end_date,
        active: new Date(end_date) >= new Date(),
        refills: 1, // Default value
        pharmacy: 'Central Pharmacy' // Default value
      });
      onSave();
    } catch (error) {
      console.error("Failed to add prescription:", error);
      setError("Failed to save prescription. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm text-center -mt-2 mb-2">{error}</p>}
      <div>
        <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Patient</label>
        <select id="patient" value={patient_id} onChange={e => setPatientId(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm">
          <option value="" disabled>Select a patient</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="medication" className="block text-sm font-medium text-gray-700">Medication</label>
        <input type="text" id="medication" value={medication} onChange={e => setMedication(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">Dosage</label>
          <input type="text" id="dosage" value={dosage} onChange={e => setDosage(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
        </div>
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Frequency</label>
          <input type="text" id="frequency" value={frequency} onChange={e => setFrequency(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
        </div>
      </div>
       <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input type="date" id="startDate" value={start_date} onChange={e => setStartDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <input type="date" id="endDate" value={end_date} onChange={e => setEndDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        <button type="submit" disabled={isSaving} className="px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover disabled:bg-gray-400 transition-colors">
          {isSaving ? 'Saving...' : 'Save Prescription'}
        </button>
      </div>
    </form>
  );
};

export default PrescriptionForm;
