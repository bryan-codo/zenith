export type Page = 'Dashboard' | 'Patients' | 'Appointments' | 'Prescriptions' | 'Settings' | 'Public Health';

export type ModalType = 'addPatient' | 'addAppointment' | 'addPrescription' | 'profile' | null;

export enum AppointmentStatus {
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

// Patient Information
export interface Demographics {
    dob: string;
    gender: 'Male' | 'Female' | 'Other';
    contact: string;
    address: string;
    emergencyContact: string;
}

export interface Insurance {
    provider: string;
    policyNumber: string;
    groupNumber: string;
    isPrimary: boolean;
}

export interface Patient {
  id: string;
  name: string;
  avatarUrl: string;
  lastVisit: string;
  demographics: Demographics;
  insurance: Insurance[];
  iotData?: { 
    heartRate: number;
    steps: number;
  };
}

// Clinical Data
export interface Diagnosis {
    id: string;
    date: string;
    code: string; // e.g., ICD-10
    description: string;
    isChronic: boolean;
}

export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
}

export interface Immunization {
    id:string;
    date: string;
    vaccine: string;
    administrator: string;
}

export interface ClinicalNote {
    id: string;
    date: string;
    author: string;
    note: string;
}

export interface EHR {
    patientId: string;
    medicalHistory: string[];
    allergies: string[];
    diagnoses: Diagnosis[];
    medications: Medication[];
    immunizations: Immunization[];
    notes: ClinicalNote[];
}

// Operational Data
export interface Appointment {
  id: string;
  patient: Patient;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  status: AppointmentStatus;
}

export enum ClaimStatus {
    Submitted = 'Submitted',
    Approved = 'Approved',
    Denied = 'Denied',
    Pending = 'Pending'
}

export interface Billing {
    claimId: string;
    patientId: string;
    dateOfService: string;
    amount: number;
    status: ClaimStatus;
    details: string;
}

// Task Management
export interface Task {
    id: string;
    text: string;
    completed: boolean;
}

// Ancillary Data
export interface LabResult {
    id: string;
    patientId: string;
    testName: string;
    result: string;
    referenceRange: string;
    date: string;
}

export interface RadiologyImage {
    id: string;
    patientId: string;
    type: 'X-Ray' | 'MRI' | 'CT Scan';
    bodyPart: string;
    imageUrl: string;
    date: string;
}

export interface Prescription {
  id: string;
  patient: Patient;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  active: boolean;
  refills: number;
  pharmacy: string;
}

// Public Health Data
export interface PublicHealthStat {
    region: string;
    metric: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
}