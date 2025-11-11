import { Patient, Appointment, Prescription, AppointmentStatus, Demographics, Insurance, EHR, LabResult, RadiologyImage, Billing, ClaimStatus, Task, PublicHealthStat } from '../types';

// PATIENT DATA
const demographics: { [key: string]: Demographics } = {
    p1: { dob: '1972-09-21', gender: 'Male', contact: '(555) 123-4567', address: '123 Wonderwall Lane, Manchester, UK', emergencyContact: '(555) 111-2222' },
    p2: { dob: '1967-05-29', gender: 'Male', contact: '(555) 987-6543', address: '456 Champagne Ave, Manchester, UK', emergencyContact: '(555) 333-4444' },
    p3: { dob: '1990-03-12', gender: 'Female', contact: '(555) 345-6789', address: '789 Skyline Dr, Austin, TX', emergencyContact: '(555) 555-6666' },
    p4: { dob: '1985-07-24', gender: 'Male', contact: '(555) 234-5678', address: '101 Maple St, Toronto, CA', emergencyContact: '(555) 777-8888' },
    p5: { dob: '2001-11-30', gender: 'Female', contact: '(555) 111-3333', address: '222 Ocean Blvd, Los Angeles, CA', emergencyContact: '(555) 222-4444' },
};

const insurance: { [key: string]: Insurance[] } = {
    p1: [{ provider: 'State Health Plan', policyNumber: 'UK987654', groupNumber: 'GRP-A1', isPrimary: true }],
    p2: [{ provider: 'Musicians Union Health', policyNumber: 'MU123456', groupNumber: 'GRP-B2', isPrimary: true }],
    p3: [{ provider: 'Blue Cross Shield', policyNumber: 'BCBS-TX-998877', groupNumber: 'BCBSTX-LgEmp', isPrimary: true }],
    p4: [{ provider: 'Sun Life Financial', policyNumber: 'SLF-456123', groupNumber: 'GRP-C3', isPrimary: true }],
    p5: [{ provider: 'Aetna', policyNumber: 'AE-555-777', groupNumber: 'GRP-D4', isPrimary: true }],
};

const patients: Patient[] = [
    { id: 'p1', name: 'Liam Gallagher', avatarUrl: 'https://picsum.photos/id/1005/200/200', lastVisit: '2023-10-15', demographics: demographics.p1, insurance: insurance.p1, iotData: { heartRate: 72, steps: 8021 } },
    { id: 'p2', name: 'Noel Gallagher', avatarUrl: 'https://picsum.photos/id/1006/200/200', lastVisit: '2023-11-01', demographics: demographics.p2, insurance: insurance.p2, iotData: { heartRate: 68, steps: 6543 } },
    { id: 'p3', name: 'Emily White', avatarUrl: 'https://picsum.photos/id/1011/200/200', lastVisit: '2023-09-22', demographics: demographics.p3, insurance: insurance.p3, iotData: { heartRate: 65, steps: 10234 } },
    { id: 'p4', name: 'David Chen', avatarUrl: 'https://picsum.photos/id/1012/200/200', lastVisit: '2023-11-10', demographics: demographics.p4, insurance: insurance.p4, iotData: { heartRate: 75, steps: 4321 } },
    { id: 'p5', name: 'Olivia Rodriguez', avatarUrl: 'https://picsum.photos/id/1027/200/200', lastVisit: '2024-01-05', demographics: demographics.p5, insurance: insurance.p5 },
];

// CLINICAL DATA
const ehrs: EHR[] = [
    { patientId: 'p1', medicalHistory: ['Hypertension'], allergies: ['Penicillin'], diagnoses: [{id: 'd1', date: '2023-10-15', code: 'I10', description: 'Essential hypertension', isChronic: true}], medications: [{id: 'm1', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2023-10-15'}], immunizations: [{id: 'im1', date: '2022-09-01', vaccine: 'Influenza', administrator: 'Dr. Sharma'}], notes: [{id: 'n1', date: '2023-10-15', author: 'Dr. Sharma', note: 'Patient presented with high blood pressure. Prescribed Lisinopril. Follow-up in 3 months.'}] },
    { patientId: 'p3', medicalHistory: ['Asthma'], allergies: ['None'], diagnoses: [{id: 'd2', date: '2023-09-22', code: 'J45', description: 'Asthma, unspecified', isChronic: true}], medications: [{id: 'm2', name: 'Albuterol Inhaler', dosage: '90mcg', frequency: 'As needed', startDate: '2023-09-22'}], immunizations: [{id: 'im2', date: '2023-01-15', vaccine: 'Tetanus', administrator: 'Dr. Carter'}], notes: [{id: 'n2', date: '2023-09-22', author: 'Dr. Carter', note: 'Patient reports seasonal asthma flare-ups. Refilled Albuterol.'}] },
];

// ANCILLARY DATA
const labResults: LabResult[] = [
    { id: 'lr1', patientId: 'p1', testName: 'Lipid Panel', result: 'Total Chol: 210 mg/dL', referenceRange: '<200 mg/dL', date: '2023-10-15' },
    { id: 'lr2', patientId: 'p3', testName: 'Complete Blood Count (CBC)', result: 'WBC: 5.5 x10^3/uL', referenceRange: '4.0-11.0', date: '2023-09-22' },
];

const radiologyImages: RadiologyImage[] = [
    { id: 'ri1', patientId: 'p2', type: 'X-Ray', bodyPart: 'Left Hand', imageUrl: 'https://picsum.photos/seed/xray1/800/600', date: '2023-08-10' },
];

// OPERATIONAL DATA
let appointments: Appointment[] = [
    { id: 'a1', patient: patients[0], doctor: 'Dr. Anya Sharma', date: new Date().toISOString().split('T')[0], time: '10:00 AM', reason: 'Annual Checkup', status: AppointmentStatus.Scheduled },
    { id: 'a2', patient: patients[2], doctor: 'Dr. Ben Carter', date: new Date().toISOString().split('T')[0], time: '11:30 AM', reason: 'Follow-up', status: AppointmentStatus.Scheduled },
    { id: 'a3', patient: patients[1], doctor: 'Dr. Anya Sharma', date: '2024-07-28', time: '02:00 PM', reason: 'Consultation', status: AppointmentStatus.Completed },
    { id: 'a4', patient: patients[3], doctor: 'Dr. Chloe Davis', date: '2024-07-25', time: '09:00 AM', reason: 'Dental Cleaning', status: AppointmentStatus.Cancelled },
];

let prescriptions: Prescription[] = [
    { id: 'pr1', patient: patients[0], medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2023-10-15', endDate: '2024-10-15', active: true, refills: 3, pharmacy: 'CVS Pharmacy' },
    { id: 'pr2', patient: patients[2], medication: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', startDate: '2023-09-22', endDate: '2023-10-02', active: false, refills: 0, pharmacy: 'Walgreens' },
    { id: 'pr3', patient: patients[3], medication: 'Metformin', dosage: '1000mg', frequency: 'Once daily', startDate: '2023-11-10', endDate: '2024-11-10', active: true, refills: 6, pharmacy: 'Walmart Pharmacy' },
];

const billing: Billing[] = [
    { claimId: 'clm001', patientId: 'p1', dateOfService: '2023-10-15', amount: 250.00, status: ClaimStatus.Approved, details: 'Annual Physical' },
    { claimId: 'clm002', patientId: 'p2', dateOfService: '2024-07-28', amount: 150.00, status: ClaimStatus.Submitted, details: 'Specialist Consultation' },
    { claimId: 'clm003', patientId: 'p3', dateOfService: '2023-09-22', amount: 120.00, status: ClaimStatus.Approved, details: 'Follow-up Visit' },
    { claimId: 'clm004', patientId: 'p4', dateOfService: '2023-11-10', amount: 350.00, status: ClaimStatus.Pending, details: 'New Patient Visit & Bloodwork' },
];

let tasks: Task[] = [
    { id: 't1', text: 'Review Liam G\'s recent lab results', completed: false },
    { id: 't2', text: 'Follow up with Emily W about medication adjustment', completed: false },
    { id: 't3', text: 'Sign off on patient charts from yesterday', completed: true },
];

const publicHealthStats: PublicHealthStat[] = [
    { region: 'North District', metric: 'Flu Cases', value: '1,204', trend: 'up' },
    { region: 'North District', metric: 'Vaccination Rate', value: '78%', trend: 'stable' },
    { region: 'South District', metric: 'Flu Cases', value: '890', trend: 'down' },
    { region: 'South District', metric: 'Vaccination Rate', value: '82%', trend: 'up' },
    { region: 'West County', metric: 'COVID-19 Positivity', value: '3.1%', trend: 'stable' },
    { region: 'East County', metric: 'COVID-19 Positivity', value: '4.5%', trend: 'up' },
];

// API SIMULATION
const simulateApiCall = <T,>(data: T, delay = 500): Promise<T> => {
    return new Promise(resolve => setTimeout(() => {
        // Create a deep copy to simulate getting data from an API.
        // JSON.stringify(undefined) returns undefined, which causes JSON.parse to fail.
        // We handle this case explicitly to prevent crashes.
        if (data === undefined) {
            resolve(undefined as T);
            return;
        }
        resolve(JSON.parse(JSON.stringify(data)));
    }, delay));
};

// EXPORTED FUNCTIONS
export const getPatients = (): Promise<Patient[]> => simulateApiCall(patients);
export const getAppointments = (): Promise<Appointment[]> => simulateApiCall(appointments);
export const getPrescriptions = (): Promise<Prescription[]> => simulateApiCall(prescriptions);
export const getBilling = (): Promise<Billing[]> => simulateApiCall(billing);
export const getTasks = (): Promise<Task[]> => simulateApiCall(tasks);
export const getPublicHealthStats = (): Promise<PublicHealthStat[]> => simulateApiCall(publicHealthStats);

export const toggleTask = (taskId: string): Promise<Task | undefined> => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
    }
    return simulateApiCall(task, 100);
}

export const getEHR = (patientId: string): Promise<EHR | undefined> => simulateApiCall(ehrs.find(e => e.patientId === patientId));
export const getLabResults = (patientId: string): Promise<LabResult[]> => simulateApiCall(labResults.filter(l => l.patientId === patientId));
export const getRadiologyImages = (patientId: string): Promise<RadiologyImage[]> => simulateApiCall(radiologyImages.filter(r => r.patientId === patientId));


export const addPatient = (patientData: Omit<Patient, 'id' | 'avatarUrl' | 'lastVisit' | 'insurance' | 'demographics'> & {demographics: Omit<Demographics, 'address' | 'emergencyContact'>}): Promise<Patient> => {
    const newPatient: Patient = {
        id: `p${patients.length + 1}`,
        name: patientData.name,
        avatarUrl: `https://picsum.photos/id/${1020 + patients.length}/200/200`,
        lastVisit: new Date().toISOString().split('T')[0],
        demographics: {
            ...patientData.demographics,
            address: 'N/A',
            emergencyContact: 'N/A'
        },
        insurance: []
    };
    patients.push(newPatient);
    return simulateApiCall(newPatient);
}

export const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'patient' > & {patientId: string}): Promise<Appointment> => {
    const patient = patients.find(p => p.id === appointmentData.patientId);
    if (!patient) return Promise.reject("Patient not found");

    const newAppointment: Appointment = {
        ...appointmentData,
        id: `a${appointments.length + 1}`,
        patient,
    };
    appointments.unshift(newAppointment);
    return simulateApiCall(newAppointment);
}

export const addPrescription = (prescriptionData: Omit<Prescription, 'id' | 'patient' | 'refills' | 'pharmacy'> & {patientId: string}): Promise<Prescription> => {
    const patient = patients.find(p => p.id === prescriptionData.patientId);
    if (!patient) return Promise.reject("Patient not found");

    const newPrescription: Prescription = {
        ...prescriptionData,
        id: `pr${prescriptions.length + 1}`,
        patient,
        refills: 1,
        pharmacy: 'Default Pharmacy'
    };
    prescriptions.unshift(newPrescription);
    return simulateApiCall(newPrescription);
};