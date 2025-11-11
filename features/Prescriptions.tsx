import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import SkeletonLoader from '../components/SkeletonLoader';
import { getPrescriptions } from '../services/apiService';
import { Prescription, ModalType } from '../types';

interface PrescriptionsProps {
  openModal: (modal: ModalType) => void;
}

const Prescriptions: React.FC<PrescriptionsProps> = ({ openModal }) => {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                setLoading(true);
                const data = await getPrescriptions();
                setPrescriptions(data);
            } catch (error) {
                console.error("Failed to fetch prescriptions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrescriptions();
    }, []);
    
    const renderContent = () => {
        if (loading) {
            return <SkeletonLoader rows={5} cols={5} />;
        }

        if (prescriptions.length === 0) {
            return (
                <EmptyState
                    message="No prescriptions found."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                >
                     <button 
                        onClick={() => openModal('addPrescription')}
                        className="mt-4 px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors">
                        Add First Prescription
                    </button>
                </EmptyState>
            );
        }

        return (
             <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="p-4 font-semibold text-gray-600">Patient</th>
                        <th className="p-4 font-semibold text-gray-600">Medication</th>
                        <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">Dosage</th>
                        <th className="p-4 font-semibold text-gray-600 hidden lg:table-cell">Duration</th>
                        <th className="p-4 font-semibold text-gray-600">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map(p => (
                        <tr key={p.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 font-medium text-gray-800">{p.patient.name}</td>
                            <td className="p-4 text-gray-700">{p.medication}</td>
                            <td className="p-4 text-gray-700 hidden md:table-cell">{p.dosage}</td>
                            <td className="p-4 text-gray-700 hidden lg:table-cell">{p.startDate} to {p.endDate}</td>
                            <td className="p-4">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${p.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    <svg className={`-ml-0.5 mr-1.5 h-2 w-2 ${p.active ? 'text-green-400' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 8 8">
                                        <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    {p.active ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }


    return (
        <div>
            <Header title="Prescriptions">
                <button 
                    onClick={() => openModal('addPrescription')}
                    className="px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors">
                    Add Prescription
                </button>
            </Header>
            <Card className="overflow-x-auto">
                {renderContent()}
            </Card>
        </div>
    );
};

export default Prescriptions;