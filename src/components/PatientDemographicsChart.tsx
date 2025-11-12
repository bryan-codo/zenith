import React from 'react';
import { Patient, Demographics } from '../types';
import Card from './Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

    const ageGroups: Record<string, number> = {
        '0-18': 0,
        '19-40': 0,
        '41-60': 0,
        '61+': 0,
        'Unknown': 0,
    };

    patients.forEach(patient => {
        const demographics = patient.demographics as unknown as Demographics | null;
        
        if (demographics && demographics.dob) {
            try {
                const age = calculateAge(demographics.dob);
                if (age <= 18) ageGroups['0-18']++;
                else if (age <= 40) ageGroups['19-40']++;
                else if (age <= 60) ageGroups['41-60']++;
                else ageGroups['61+']++;
            } catch (error) {
                console.error('Error calculating age:', error);
                ageGroups['Unknown']++;
            }
        } else {
            ageGroups['Unknown']++;
        }
    });

    const chartData = Object.entries(ageGroups)
        .filter(([_, value]) => value > 0 || _ !== 'Unknown') // Show Unknown only if there are unknown ages
        .map(([label, value]) => ({ 
            ageGroup: label, 
            patients: value 
        }));

    return (
        <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Demographics</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                        dataKey="ageGroup" 
                        stroke="#6b7280"
                        style={{ fontSize: '14px' }}
                    />
                    <YAxis 
                        stroke="#6b7280"
                        style={{ fontSize: '14px' }}
                        allowDecimals={false}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '10px'
                        }}
                        labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
                    />
                    <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                    />
                    <Bar 
                        dataKey="patients" 
                        fill="#3b82f6" 
                        radius={[8, 8, 0, 0]}
                        name="Number of Patients"
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default PatientDemographicsChart;