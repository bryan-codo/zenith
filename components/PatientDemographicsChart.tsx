import React from 'react';
import { Patient } from '../types';
import Card from './Card';

interface PatientDemographicsChartProps {
    patients: Patient[];
}

const PatientDemographicsChart: React.FC<PatientDemographicsChartProps> = ({ patients }) => {
    
    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const ageGroups = {
        '0-18': 0,
        '19-40': 0,
        '41-60': 0,
        '61+': 0,
    };

    patients.forEach(patient => {
        const age = calculateAge(patient.demographics.dob);
        if (age <= 18) ageGroups['0-18']++;
        else if (age <= 40) ageGroups['19-40']++;
        else if (age <= 60) ageGroups['41-60']++;
        else ageGroups['61+']++;
    });

    const data = Object.entries(ageGroups).map(([label, value]) => ({ label, value }));
    const maxValue = Math.max(...data.map(d => d.value), 1); // Avoid division by zero

    return (
        <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Demographics</h3>
            <div className="flex justify-around items-end h-48 space-x-4">
                {data.map(({ label, value }) => (
                    <div key={label} className="flex-1 flex flex-col items-center">
                        <div 
                            className="w-full bg-accent/30 hover:bg-accent/50 rounded-t-md transition-all duration-300" 
                            style={{ height: `${(value / maxValue) * 100}%` }}
                            title={`${label}: ${value} patient(s)`}
                        >
                        </div>
                        <span className="text-xs font-medium text-gray-600 mt-2">{label}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default PatientDemographicsChart;
