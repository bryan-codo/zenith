import { supabase } from './supabaseClient';
// Fix: Import `AppointmentInsert` and `PrescriptionInsert` types to use for add functions.
import { Patient, Appointment, Prescription, Billing, Task, PublicHealthStat, EHR, LabResult, RadiologyImage, Demographics, AppointmentStatus, AppointmentInsert, PrescriptionInsert } from '../types';

// Helper to handle Supabase errors
const handleSupabaseError = ({ error, functionName }: { error: any, functionName: string }) => {
    if (error) {
        console.error(`Error in ${functionName}:`, error.message);
        throw error;
    }
};

// PATIENTS
export const getPatients = async (): Promise<Patient[]> => {
    const { data, error } = await supabase.from('patients').select('*').order('created_at', { ascending: false });
    handleSupabaseError({ error, functionName: 'getPatients' });
    // Note: Supabase returns JSONB as is. We might need to cast or validate.
    return (data as any) || [];
};

export const addPatient = async (patientData: { name: string, demographics: Omit<Demographics, 'address' | 'emergencyContact'> }): Promise<Patient> => {
    const newPatientData = {
        name: patientData.name,
        avatar_url: `https://picsum.photos/id/${1020 + Math.floor(Math.random() * 50)}/200/200`,
        last_visit: new Date().toISOString().split('T')[0],
        demographics: {
            ...patientData.demographics,
            address: 'N/A',
            emergencyContact: 'N/A'
        },
        insurance: []
    };

    const { data, error } = await supabase
        .from('patients')
        .insert(newPatientData)
        .select()
        .single();
        
    handleSupabaseError({ error, functionName: 'addPatient' });
    return data as any;
};


// APPOINTMENTS
export const getAppointments = async (): Promise<Appointment[]> => {
    const { data, error } = await supabase
        .from('appointments')
        .select('*, patient:patients(*)') // Joins with patients table
        .order('date', { ascending: false })
        .order('time', { ascending: false });
        
    handleSupabaseError({ error, functionName: 'getAppointments' });
    return (data as any) || [];
};

// Fix: Use the `AppointmentInsert` type for the function parameter, which correctly reflects the shape of data for an insert operation (e.g., `created_at` is not required).
export const addAppointment = async (appointmentData: AppointmentInsert): Promise<Appointment> => {
    const { data, error } = await supabase
        .from('appointments')
        .insert(appointmentData)
        .select('*, patient:patients(*)')
        .single();
        
    handleSupabaseError({ error, functionName: 'addAppointment' });
    return data as any;
};

// PRESCRIPTIONS
export const getPrescriptions = async (): Promise<Prescription[]> => {
    const { data, error } = await supabase
        .from('prescriptions')
        .select('*, patient:patients(*)')
        .order('start_date', { ascending: false });
        
    handleSupabaseError({ error, functionName: 'getPrescriptions' });
    return (data as any) || [];
};

// Fix: Use the `PrescriptionInsert` type for the function parameter, which correctly reflects the shape of data for an insert operation.
export const addPrescription = async (prescriptionData: PrescriptionInsert): Promise<Prescription> => {
     const { data, error } = await supabase
        .from('prescriptions')
        .insert(prescriptionData)
        .select('*, patient:patients(*)')
        .single();
        
    handleSupabaseError({ error, functionName: 'addPrescription' });
    return data as any;
};

// TASKS
export const getTasks = async (): Promise<Task[]> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at');
        
    handleSupabaseError({ error, functionName: 'getTasks' });
    return data || [];
};

export const toggleTask = async (taskId: string, currentStatus: boolean): Promise<Task> => {
    const { data, error } = await supabase
        .from('tasks')
        .update({ completed: !currentStatus })
        .eq('id', taskId)
        .select()
        .single();

    handleSupabaseError({ error, functionName: 'toggleTask' });
    return data;
};

// BILLING
export const getBilling = async (): Promise<Billing[]> => {
    const { data, error } = await supabase.from('billing').select('*').order('date_of_service', { ascending: false });
    handleSupabaseError({ error, functionName: 'getBilling' });
    return data || [];
};


// PATIENT DETAIL DATA
export const getEHR = async (patientId: string): Promise<EHR | null> => {
    const { data, error } = await supabase.from('ehr').select('*').eq('patient_id', patientId).single();
    handleSupabaseError({ error, functionName: 'getEHR' });
    return data;
};

export const getLabResults = async (patientId: string): Promise<LabResult[]> => {
    const { data, error } = await supabase.from('lab_results').select('*').eq('patient_id', patientId);
    handleSupabaseError({ error, functionName: 'getLabResults' });
    return data || [];
};

export const getRadiologyImages = async (patientId: string): Promise<RadiologyImage[]> => {
    const { data, error } = await supabase.from('radiology_images').select('*').eq('patient_id', patientId);
    handleSupabaseError({ error, functionName: 'getRadiologyImages' });
    return data || [];
};

// PUBLIC HEALTH (This would likely come from a different source in a real app)
export const getPublicHealthStats = async (): Promise<PublicHealthStat[]> => {
    // This remains mock data as it's not patient-specific and would typically be sourced from an external API.
    const publicHealthStats: PublicHealthStat[] = [
        { region: 'North District', metric: 'Flu Cases', value: '1,204', trend: 'up' },
        { region: 'North District', metric: 'Vaccination Rate', value: '78%', trend: 'stable' },
        { region: 'South District', metric: 'Flu Cases', value: '890', trend: 'down' },
        { region: 'South District', metric: 'Vaccination Rate', value: '82%', trend: 'up' },
    ];
    return Promise.resolve(publicHealthStats);
};