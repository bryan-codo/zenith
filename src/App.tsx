import React, { useState, useCallback, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import Sidebar from './components/Sidebar';
import Dashboard from './features/Dashboard';
import Patients from './features/Patients';
import Appointments from './features/Appointments';
import Prescriptions from './features/Prescriptions';
import Settings from './features/Settings';
import PublicHealth from './features/PublicHealth';
import Login from './features/Login';
import SignUp from './features/SignUp';
import Modal from './components/Modal';
import ProfileModal from './components/ProfileModal';
import PatientForm from './features/PatientForm';
import AppointmentForm from './features/AppointmentForm';
import PrescriptionForm from './features/PrescriptionForm';
import PatientDetail from './features/PatientDetail';
import { Page, ModalType, Patient } from './types';
import { getPatients } from './services/apiService';
import { supabase } from './services/supabaseClient';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login');
  const [activePage, setActivePage] = useState<Page>('Dashboard');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_OUT') {
        setCurrentView('login');
        setActivePage('Dashboard');
        setSelectedPatient(null);
      } else if (_event === 'SIGNED_IN') {
        setCurrentView('login'); // Will be redirected by the component logic
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      const fetchInitialData = async () => {
        const patientsData = await getPatients();
        setPatients(patientsData);
      };
      fetchInitialData();
    }
  }, [session, dataVersion]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  
  const refreshData = () => {
    setDataVersion(prev => prev + 1);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  
  const handleSaveSuccess = () => {
    refreshData();
    closeModal();
  };
  
  const viewPatientDetails = (patient: Patient) => {
      setSelectedPatient(patient);
      setActivePage('Patients');
  }
  
  const backToPatientList = () => {
      setSelectedPatient(null);
  }

  const renderPage = useCallback(() => {
    if (selectedPatient) {
        return <PatientDetail patient={selectedPatient} onBack={backToPatientList} />;
    }

    const pageProps = { openModal: setActiveModal };
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard patients={patients} />;
      case 'Patients':
        return <Patients openModal={setActiveModal} viewPatientDetails={viewPatientDetails} />;
      case 'Appointments':
        return <Appointments {...pageProps} />;
      case 'Prescriptions':
        return <Prescriptions {...pageProps} />;
      case 'Settings':
        return <Settings />;
      case 'Public Health':
        return <PublicHealth />;
      default:
        return <Dashboard patients={patients} />;
    }
  }, [activePage, selectedPatient, patients]);

  const renderModalContent = () => {
    switch (activeModal) {
      case 'profile':
        return <ProfileModal />;
      case 'addPatient':
        return <PatientForm onSave={handleSaveSuccess} onCancel={closeModal} />;
      case 'addAppointment':
        return <AppointmentForm patients={patients} onSave={handleSaveSuccess} onCancel={closeModal} />;
      case 'addPrescription':
        return <PrescriptionForm patients={patients} onSave={handleSaveSuccess} onCancel={closeModal} />;
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (activeModal) {
      case 'profile': return 'Doctor Profile';
      case 'addPatient': return 'Add New Patient';
      case 'addAppointment': return 'Schedule New Appointment';
      case 'addPrescription': return 'Create New Prescription';
      default: return '';
    }
  };

  if (!session) {
    if (currentView === 'signup') {
      return <SignUp onSwitchToLogin={() => setCurrentView('login')} />;
    }
    return <Login onSwitchToSignUp={() => setCurrentView('signup')} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onProfileClick={() => setActiveModal('profile')}
        onLogout={handleLogout}
        onBackToDashboard={() => setSelectedPatient(null)}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {renderPage()}
        </div>
      </main>
      <Modal isOpen={!!activeModal} onClose={closeModal} title={getModalTitle()}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default App;
