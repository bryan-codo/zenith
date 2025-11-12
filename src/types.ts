import { Database } from './types/supabase';

export type Page = 'Dashboard' | 'Patients' | 'Appointments' | 'Prescriptions' | 'Settings' | 'Public Health';

export type ModalType = 'addPatient' | 'addAppointment' | 'addPrescription' | 'profile' | null;

// Re-exporting generated types for easier access and augmentation if needed
export type Patient = Database['public']['Tables']['patients']['Row'];
export type Appointment = Database['public']['Tables']['appointments']['Row'] & { patient: Patient };
export type Prescription = Database['public']['Tables']['prescriptions']['Row'] & { patient: Patient };
export type Billing = Database['public']['Tables']['billing']['Row'];
export type Task = Database['public']['Tables']['tasks']['Row'];
export type EHR = Database['public']['Tables']['ehr']['Row'];
export type LabResult = Database['public']['Tables']['lab_results']['Row'];
export type RadiologyImage = Database['public']['Tables']['radiology_images']['Row'];

// Fix: Add insert types to align with Supabase insert operations, which don't require fields like `created_at`.
export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];
export type PrescriptionInsert = Database['public']['Tables']['prescriptions']['Insert'];

export type AppointmentStatus = Database['public']['Enums']['appointment_status'];
export type ClaimStatus = Database['public']['Enums']['claim_status'];

// These types are based on JSONB columns, so we define their structure here for client-side use
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

// Public Health Data (remains client-side as it's mock)
export interface PublicHealthStat {
    region: string;
    metric: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
}

export interface Profile {
    id: string;
    full_name: string | null;
    title: string | null; // M.D., D.O., etc.
    specialty: string | null;
    hospital: string | null;
    contact_phone: string | null;
    email: string | null;
    experience_years: number | null;
    bio: string | null;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}