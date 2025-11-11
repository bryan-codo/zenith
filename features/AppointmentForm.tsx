import React, { useState } from 'react';
import { addAppointment } from '../services/apiService';
import { Patient, AppointmentStatus } from '../types';

interface AppointmentFormProps {
  patients: Patient[];
  onSave: () => void;
  onCancel: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ patients, onSave, onCancel }) => {
  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) return;
    setIsSaving(true);
    try {
      await addAppointment({
        patientId,
        doctor: 'Dr. Anya Sharma', // Placeholder
        date,
        time,
        reason,
        status: AppointmentStatus.Scheduled,
      });
      onSave();
    } catch (error) {
      console.error("Failed to add appointment:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Patient</label>
        <select id="patient" value={patientId} onChange={e => setPatientId(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm">
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
          <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
        </div>
      </div>
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Visit</label>
        <input type="text" id="reason" value={reason} onChange={e => setReason(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
        <button type="submit" disabled={isSaving} className="px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover disabled:bg-gray-400 transition-colors">
          {isSaving ? 'Scheduling...' : 'Schedule Appointment'}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
