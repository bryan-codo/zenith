import React from 'react';

interface SkeletonLoaderProps {
    rows?: number;
    cols?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ rows = 5, cols = 4 }) => {
    return (
        <div className="w-full animate-pulse">
            <div className="hidden md:flex border-b border-gray-200">
                {[...Array(cols)].map((_, i) => (
                    <div key={i} className="p-4 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                ))}
            </div>
            <div className="space-y-2 p-2 md:p-0">
                {[...Array(rows)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 p-2 border-b border-gray-200 last:border-b-0">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/6 md:hidden"></div>
                        </div>
                        {[...Array(cols - 2)].map((_, j) => (
                             <div key={j} className="flex-1 h-4 bg-gray-200 rounded hidden md:block"></div>
                        ))}
                         <div className="flex-1 h-4 bg-gray-200 rounded hidden md:block w-16"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkeletonLoader;