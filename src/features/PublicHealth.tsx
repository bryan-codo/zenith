import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { getPublicHealthStats } from '../services/apiService';
import { PublicHealthStat } from '../types';

const TrendIcon: React.FC<{ trend: 'up' | 'down' | 'stable' }> = ({ trend }) => {
    if (trend === 'up') {
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" /></svg>;
    }
    if (trend === 'down') {
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" /></svg>;
    }
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>;
};

const PublicHealth: React.FC = () => {
    const [stats, setStats] = useState<PublicHealthStat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getPublicHealthStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch public health stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    const statsByRegion = stats.reduce((acc, stat) => {
        if (!acc[stat.region]) {
            acc[stat.region] = [];
        }
        acc[stat.region].push(stat);
        return acc;
    }, {} as Record<string, PublicHealthStat[]>);

    return (
        <div>
            <Header title="Public Health Overview" />
            <p className="mb-6 text-gray-600">Monitoring key health metrics across regional districts.</p>
            
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                            <div className="space-y-3">
                                <div className="h-8 bg-gray-200 rounded"></div>
                                <div className="h-8 bg-gray-200 rounded"></div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(statsByRegion).map(([region, regionStats]) => (
                        <Card key={region}>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">{region}</h3>
                            <div className="space-y-3">
                                {regionStats.map(stat => (
                                    <div key={stat.metric} className="flex justify-between items-center p-3 bg-gray-50/80 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-700">{stat.metric}</p>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <TrendIcon trend={stat.trend} />
                                            <span className="text-sm font-medium text-gray-600 capitalize">{stat.trend}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PublicHealth;
