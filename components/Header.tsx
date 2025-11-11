
import React from 'react';

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export default Header;
