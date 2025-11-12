import React, { useState, useEffect } from 'react';
import { Patient, EHR, LabResult, RadiologyImage, Demographics, Insurance } from '../types';
import { getEHR, getLabResults, getRadiologyImages } from '../services/apiService';
import Card from '../components/Card';

interface PatientDetailProps {
  patient: Patient;
  onBack: () => void;
}

const DetailSection: React.FC<{title: string; icon?: React.ReactNode; children: React.ReactNode}> = ({title, icon, children}) => (
    <Card className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 flex items-center">
            {icon && <span className="mr-3 text-accent">{icon}</span>}
            {title}
        </h3>
        {children}
    </Card>
);

const InfoItem: React.FC<{label: string; value: React.ReactNode}> = ({label, value}) => (
    <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-sm text-gray-800">{value || 'N/A'}</p>
    </div>
);

const PatientDetail: React.FC<PatientDetailProps> = ({ patient, onBack }) => {
  const [ehr, setEhr] = useState<EHR | null>(null);
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [radiology, setRadiology] = useState<RadiologyImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Type assertion for JSONB columns - FIX: Insurance is a single object, not array
  const demographics = patient.demographics as unknown as Demographics | null;
  const insurance = patient.insurance as unknown as Insurance | null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ehrData, labData, radioData] = await Promise.all([
          getEHR(patient.id),
          getLabResults(patient.id),
          getRadiologyImages(patient.id),
        ]);
        setEhr(ehrData || null);
        setLabResults(labData);
        setRadiology(radioData);
      } catch (error) {
        console.error("Failed to fetch patient details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [patient.id]);

  if (loading) {
      return <div className="flex justify-center items-center h-full"><div className="text-center p-8">Loading patient records...</div></div>;
  }

  const PersonIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
  const ClipboardIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
  const BeakerIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 00.547-1.806z" /></svg>;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={patient.avatar_url ?? ''} alt={patient.name} className="w-16 h-16 rounded-full mr-4 border-2 border-white shadow-md" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
            <p className="text-gray-500">Patient ID: {patient.id.substring(0, 8)}</p>
          </div>
        </div>
        <button onClick={onBack} className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors self-start md:self-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to List
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
            <DetailSection title="Patient Information" icon={PersonIcon}>
                <div className="grid grid-cols-2 gap-4">
                    <InfoItem label="Date of Birth" value={demographics?.dob} />
                    <InfoItem label="Gender" value={demographics?.gender} />
                    <InfoItem label="Contact" value={demographics?.contact} />
                    <InfoItem label="Emergency Contact" value={demographics?.emergencyContact} />
                    <div className="col-span-2"><InfoItem label="Address" value={demographics?.address} /></div>
                </div>
                 <h4 className="font-semibold pt-4 mt-4 border-t border-gray-200">Insurance</h4>
                    {insurance ? (
                        <div className="grid grid-cols-2 gap-4 mt-2">
                             <InfoItem label="Provider" value={insurance.provider} />
                             <InfoItem label="Policy #" value={insurance.policyNumber} />
                             <InfoItem label="Group #" value={insurance.groupNumber} />
                             <InfoItem label="Primary" value={insurance.isPrimary ? 'Yes' : 'No'} />
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 mt-2">No insurance information available.</p>
                    )}
            </DetailSection>
            
            <DetailSection title="Ancillary Data" icon={BeakerIcon}>
                 <h4 className="font-semibold text-md mb-2">Lab Results</h4>
                 {labResults.length > 0 ? labResults.map(lab => (
                     <div key={lab.id} className="text-sm p-3 bg-gray-50/80 rounded-lg mb-2 border border-gray-200/80">
                         <p><strong>{lab.test_name}:</strong> {lab.result} <span className="text-gray-500">({lab.reference_range})</span></p>
                         <p className="text-xs text-gray-500 mt-1">{lab.date}</p>
                     </div>
                 )) : <p className="text-sm text-gray-500">No lab results found.</p>}

                 <h4 className="font-semibold text-md mt-4 mb-2">Radiology</h4>
                 {radiology.length > 0 ? radiology.map(img => (
                     <div key={img.id} className="text-sm">
                        <p className="font-medium mb-1"><strong>{img.type} - {img.body_part}</strong> ({img.date})</p>
                         <img src={img.image_url ?? ''} alt={`${img.type} of ${img.body_part}`} className="rounded-lg w-full" />
                     </div>
                 )) : <p className="text-sm text-gray-500">No radiology images found.</p>}
            </DetailSection>
        </div>

        <div className="lg:col-span-2">
            <DetailSection title="Electronic Health Record (EHR)" icon={ClipboardIcon}>
                {!ehr ? <p className="text-sm text-gray-500">No EHR data available for this patient.</p> : (
                    <div className="space-y-6 text-sm">
                        <div>
                            <h4 className="font-semibold text-base mb-2">Allergies</h4>
                            <div className="flex flex-wrap gap-2">
                               {ehr.allergies && ehr.allergies.length > 0 ? ehr.allergies.map(a => <span key={a} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">{a}</span>) : <span className="text-gray-500">None recorded</span>}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-base mb-2">Medical History</h4>
                            <p>{ehr.medical_history && ehr.medical_history.length > 0 ? ehr.medical_history.join(', ') : 'None recorded'}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-base mb-2">Diagnoses</h4>
                            <pre className="text-xs bg-gray-50 p-2 rounded-md whitespace-pre-wrap">{ehr.diagnoses ? JSON.stringify(ehr.diagnoses, null, 2) : 'None recorded'}</pre>
                        </div>
                         <div>
                            <h4 className="font-semibold text-base mb-2">Medications</h4>
                            <pre className="text-xs bg-gray-50 p-2 rounded-md whitespace-pre-wrap">{ehr.medications ? JSON.stringify(ehr.medications, null, 2) : 'None recorded'}</pre>
                        </div>
                        <div>
                            <h4 className="font-semibold text-base mb-2">Clinical Notes</h4>
                            <pre className="text-xs bg-gray-50 p-2 rounded-md whitespace-pre-wrap">{ehr.notes ? JSON.stringify(ehr.notes, null, 2) : 'None recorded'}</pre>
                        </div>
                    </div>
                )}
            </DetailSection>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;