import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import SkeletonLoader from '../components/SkeletonLoader';
import { getPatients } from '../services/apiService';
import { Patient, ModalType } from '../types';

interface PatientsProps {
  openModal: (modal: ModalType) => void;
  viewPatientDetails: (patient: Patient) => void;
}

const Patients: React.FC<PatientsProps> = ({ openModal, viewPatientDetails }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const renderContent = () => {
      if (loading) {
          return <SkeletonLoader rows={5} cols={5} />;
      }
      if (filteredPatients.length === 0) {
          return (
            <EmptyState 
                message="No patients found."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-3-5.197M15 21a9 9 0 00-9-9" /></svg>}
            >
                 <button 
                    onClick={() => openModal('addPatient')}
                    className="mt-4 px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors">
                    Add First Patient
                </button>
            </EmptyState>
          );
      }

      return (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600">Name</th>
              <th className="p-4 font-semibold text-gray-600">Contact</th>
              <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">Date of Birth</th>
              <th className="p-4 font-semibold text-gray-600 hidden lg:table-cell">Last Visit</th>
              <th className="p-4 font-semibold text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                <td className="p-4 flex items-center">
                  <img src={patient.avatarUrl} alt={patient.name} className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <p className="font-semibold text-gray-800">{patient.name}</p>
                    <p className="text-sm text-gray-500">{patient.demographics.gender}</p>
                  </div>
                </td>
                <td className="p-4 text-gray-700">{patient.demographics.contact}</td>
                <td className="p-4 text-gray-700 hidden md:table-cell">{patient.demographics.dob}</td>
                <td className="p-4 text-gray-700 hidden lg:table-cell">{patient.lastVisit}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => viewPatientDetails(patient)}
                    className="text-accent hover:underline font-medium"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
  }

  return (
    <div>
      <Header title="Patients">
        <div className="flex space-x-2">
            <input 
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
            />
            <button 
                onClick={() => openModal('addPatient')}
                className="px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors">
                Add Patient
            </button>
        </div>
      </Header>
      
      <Card className="overflow-x-auto">
        {renderContent()}
      </Card>
    </div>
  );
};

export default Patients;