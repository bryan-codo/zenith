import React from 'react';
import Card from './Card';

interface EmptyStateProps {
    icon: React.ReactNode;
    message: string;
    children?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, message, children }) => {
    return (
        <div className="text-center py-12 px-6">
            <div className="flex justify-center mb-4">
                {icon}
            </div>
            <p className="text-lg font-medium text-gray-600">{message}</p>
            {children}
        </div>
    );
};

export default EmptyState;
