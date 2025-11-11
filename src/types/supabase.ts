export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string
          date: string | null
          doctor: string | null
          id: string
          patient_id: string | null
          reason: string | null
          status: Database["public"]["Enums"]["appointment_status"] | null
          time: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          doctor?: string | null
          id?: string
          patient_id?: string | null
          reason?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          time?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          doctor?: string | null
          id?: string
          patient_id?: string | null
          reason?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patients"
            referencedColumns: ["id"]
          }
        ]
      }
      billing: {
        Row: {
          amount: number | null
          claim_id: string
          created_at: string
          date_of_service: string | null
          details: string | null
          patient_id: string | null
          status: Database["public"]["Enums"]["claim_status"] | null
        }
        Insert: {
          amount?: number | null
          claim_id?: string
          created_at?: string
          date_of_service?: string | null
          details?: string | null
          patient_id?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
        }
        Update: {
          amount?: number | null
          claim_id?: string
          created_at?: string
          date_of_service?: string | null
          details?: string | null
          patient_id?: string | null
          status?: Database["public"]["Enums"]["claim_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patients"
            referencedColumns: ["id"]
          }
        ]
      }
      ehr: {
        Row: {
          allergies: string[] | null
          diagnoses: Json | null
          id: string
          immunizations: Json | null
          medical_history: string[] | null
          medications: Json | null
          notes: Json | null
          patient_id: string | null
        }
        Insert: {
          allergies?: string[] | null
          diagnoses?: Json | null
          id?: string
          immunizations?: Json | null
          medical_history?: string[] | null
          medications?: Json | null
          notes?: Json | null
          patient_id?: string | null
        }
        Update: {
          allergies?: string[] | null
          diagnoses?: Json | null
          id?: string
          immunizations?: Json | null
          medical_history?: string[] | null
          medications?: Json | null
          notes?: Json | null
          patient_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ehr_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patients"
            referencedColumns: ["id"]
          }
        ]
      }
      lab_results: {
        Row: {
          date: string | null
          id: string
          patient_id: string | null
          reference_range: string | null
          result: string | null
          test_name: string | null
        }
        Insert: {
          date?: string | null
          id?: string
          patient_id?: string | null
          reference_range?: string | null
          result?: string | null
          test_name?: string | null
        }
        Update: {
          date?: string | null
          id?: string
          patient_id?: string | null
          reference_range?: string | null
          result?: string | null
          test_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_results_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patients"
            referencedColumns: ["id"]
          }
        ]
      }
      patients: {
        Row: {
          avatar_url: string | null
          created_at: string
          demographics: Json | null
          id: string
          insurance: Json | null
          last_visit: string | null
          name: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          demographics?: Json | null
          id?: string
          insurance?: Json | null
          last_visit?: string | null
          name: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          demographics?: Json | null
          id?: string
          insurance?: Json | null
          last_visit?: string | null
          name?: string
        }
        Relationships: []
      }
      prescriptions: {
        Row: {
          active: boolean | null
          created_at: string
          dosage: string | null
          end_date: string | null
          frequency: string | null
          id: string
          medication: string | null
          patient_id: string | null
          pharmacy: string | null
          refills: number | null
          start_date: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          dosage?: string | null
          end_date?: string | null
          frequency?: string | null
          id?: string
          medication?: string | null
          patient_id?: string | null
          pharmacy?: string | null
          refills?: number | null
          start_date?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          dosage?: string | null
          end_date?: string | null
          frequency?: string | null
          id?: string
          medication?: string | null
          patient_id?: string | null
          pharmacy?: string | null
          refills?: number | null
          start_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patients"
            referencedColumns: ["id"]
          }
        ]
      }
      radiology_images: {
        Row: {
          body_part: string | null
          date: string | null
          id: string
          image_url: string | null
          patient_id: string | null
          type: string | null
        }
        Insert: {
          body_part?: string | null
          date?: string | null
          id?: string
          image_url?: string | null
          patient_id?: string | null
          type?: string | null
        }
        Update: {
          body_part?: string | null
          date?: string | null
          id?: string
          image_url?: string | null
          patient_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "radiology_images_patient_id_fkey"
            columns: ["patient_id"]
            referencedRelation: "patients"
            referencedColumns: ["id"]
          }
        ]
      }
      tasks: {
        Row: {
          completed: boolean | null
          created_at: string
          id: string
          text: string | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          id?: string
          text?: string | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          id?: string
          text?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      appointment_status: "Scheduled" | "Completed" | "Cancelled"
      claim_status: "Submitted" | "Approved" | "Denied" | "Pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
