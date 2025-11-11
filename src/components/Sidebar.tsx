import React from 'react';
import { Page } from '../types';
import { NAV_ITEMS, LogoutIcon } from '../constants';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  onProfileClick: () => void;
  onLogout: () => void;
  onBackToDashboard: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, onProfileClick, onLogout, onBackToDashboard }) => {
  const handleNavClick = (page: Page) => {
    onBackToDashboard();
    setActivePage(page);
  };
  
  return (
    <aside className="w-20 lg:w-64 bg-white/50 backdrop-blur-xl border-r border-gray-200/80 flex flex-col">
      <div className="flex items-center justify-center lg:justify-start lg:px-6 h-20 border-b border-gray-200/80">
          <div className="w-8 h-8 bg-accent rounded-full"></div>
          <h1 className="hidden lg:block ml-3 text-xl font-bold text-gray-800">Zenith OS</h1>
      </div>
      <nav className="flex-1 px-2 lg:px-4 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.page}
            onClick={() => handleNavClick(item.page)}
            className={`flex items-center justify-center lg:justify-start w-full px-3 py-3 rounded-lg transition-colors duration-200 ${
              activePage === item.page
                ? 'bg-accent text-white'
                : 'text-gray-600 hover:bg-gray-200/80 hover:text-gray-800'
            }`}
          >
            {item.icon}
            <span className="hidden lg:block ml-4 text-md font-medium">{item.page}</span>
          </button>
        ))}
      </nav>
      
      <div className="px-2 lg:px-4 py-4 space-y-1 border-t border-gray-200/80">
        <button
          onClick={onLogout}
          className="flex items-center justify-center lg:justify-start w-full px-3 py-3 rounded-lg text-gray-600 hover:bg-gray-200/80 hover:text-gray-800 transition-colors duration-200"
        >
          <LogoutIcon />
          <span className="hidden lg:block ml-4 text-md font-medium">Logout</span>
        </button>

        <button 
          onClick={onProfileClick}
          className="flex items-center w-full p-2 rounded-lg hover:bg-gray-200/80 transition-colors"
        >
          <img src="https://picsum.photos/id/237/200/200" alt="Dr. Anya Sharma" className="w-10 h-10 rounded-full" />
          <div className="hidden lg:block ml-3 text-left">
            <p className="text-sm font-semibold text-gray-800">Dr. Anya Sharma</p>
            <p className="text-xs text-gray-500">Cardiologist</p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;