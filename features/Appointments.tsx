import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import SkeletonLoader from '../components/SkeletonLoader';
import { getAppointments } from '../services/apiService';
import { Appointment, AppointmentStatus, ModalType } from '../types';

const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
        case AppointmentStatus.Scheduled: return 'bg-blue-100 text-blue-800';
        case AppointmentStatus.Completed: return 'bg-green-100 text-green-800';
        case AppointmentStatus.Cancelled: return 'bg-red-100 text-red-800';
    }
}

interface AppointmentsProps {
  openModal: (modal: ModalType) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({ openModal }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                const data = await getAppointments();
                setAppointments(data);
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <SkeletonLoader rows={5} cols={5} />;
        }

        if (appointments.length === 0) {
            return (
                <EmptyState
                    message="No appointments scheduled."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                >
                    <button 
                        onClick={() => openModal('addAppointment')}
                        className="mt-4 px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors">
                        Schedule First Appointment
                    </button>
                </EmptyState>
            );
        }

        return (
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="p-4 font-semibold text-gray-600">Patient</th>
                        <th className="p-4 font-semibold text-gray-600">Date & Time</th>
                        <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">Doctor</th>
                        <th className="p-4 font-semibold text-gray-600 hidden lg:table-cell">Reason</th>
                        <th className="p-4 font-semibold text-gray-600">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(apt => (
                        <tr key={apt.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center">
                                    <img src={apt.patient.avatarUrl} alt={apt.patient.name} className="w-10 h-10 rounded-full mr-3" />
                                    <span className="font-medium text-gray-800">{apt.patient.name}</span>
                                </div>
                            </td>
                            <td className="p-4">
                                <p className="font-medium text-gray-800">{apt.date}</p>
                                <p className="text-sm text-gray-500">{apt.time}</p>
                            </td>
                            <td className="p-4 text-gray-700 hidden md:table-cell">{apt.doctor}</td>
                            <td className="p-4 text-gray-700 hidden lg:table-cell">{apt.reason}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(apt.status)}`}>
                                    {apt.status}
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
            <Header title="Appointments">
                 <button 
                    onClick={() => openModal('addAppointment')}
                    className="px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors">
                    Schedule New
                </button>
            </Header>
            <Card className="overflow-x-auto">
                {renderContent()}
            </Card>
        </div>
    );
};

export default Appointments;