import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import SkeletonLoader from '../components/SkeletonLoader';
import { getBilling } from '../services/apiService';
import { Billing, ClaimStatus } from '../types';

const getStatusColor = (status: ClaimStatus) => {
    switch (status) {
        case 'Approved': return 'bg-green-100 text-green-800';
        case 'Submitted': return 'bg-blue-100 text-blue-800';
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Denied': return 'bg-red-100 text-red-800';
    }
};

const Settings: React.FC = () => {
    const [billing, setBilling] = useState<Billing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const billingData = await getBilling();
                setBilling(billingData);
            } catch (error) {
                console.error("Failed to fetch billing data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <SkeletonLoader rows={4} cols={5} />;
        }
        if (billing.length === 0) {
            return (
                <EmptyState 
                    message="No billing claims found."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                />
            );
        }
        return (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="p-4 font-semibold text-gray-600">Claim ID</th>
                            <th className="p-4 font-semibold text-gray-600">Patient ID</th>
                            <th className="p-4 font-semibold text-gray-600">Date of Service</th>
                            <th className="p-4 font-semibold text-gray-600">Amount</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billing.map(claim => (
                            <tr key={claim.claim_id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 font-mono text-sm text-gray-700">{claim.claim_id.substring(0,8)}</td>
                                <td className="p-4 text-gray-700 font-mono text-sm">{claim.patient_id?.substring(0,8)}</td>
                                <td className="p-4 text-gray-700">{claim.date_of_service}</td>
                                <td className="p-4 text-gray-700">${Number(claim.amount).toFixed(2)}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(claim.status as ClaimStatus)}`}>
                                        {claim.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div>
            <Header title="Settings" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Operational Data</h2>
            
            <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing & Claims</h3>
                {renderContent()}
            </Card>
        </div>
    );
};

export default Settings;
