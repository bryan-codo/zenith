import React, { useState, useCallback, useEffect } from 'react';
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

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'app'>('login');
  const [activePage, setActivePage] = useState<Page>('Dashboard');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [dataVersion, setDataVersion] = useState(0); // Used to trigger data refetch

  useEffect(() => {
    if (isAuthenticated) {
      const fetchInitialData = async () => {
        const patientsData = await getPatients();
        setPatients(patientsData);
      };
      fetchInitialData();
    }
  }, [isAuthenticated, dataVersion]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('app');
  };
  
  const handleSignUp = () => {
    // In a real app, this would handle user creation and then login
    setIsAuthenticated(true);
    setCurrentView('app');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
    setActivePage('Dashboard');
    setSelectedPatient(null);
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
      setActivePage('Patients'); // Keep sidebar active on Patients
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

  if (!isAuthenticated) {
    if (currentView === 'signup') {
      return <SignUp onSignUp={handleSignUp} onSwitchToLogin={() => setCurrentView('login')} />;
    }
    return <Login onLogin={handleLogin} onSwitchToSignUp={() => setCurrentView('signup')} />;
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