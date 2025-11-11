import React from 'react';

const ProfileModal: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <img src="https://picsum.photos/id/237/200/200" alt="Dr. Anya Sharma" className="w-20 h-20 rounded-full" />
        <div>
          <h4 className="text-lg font-bold text-gray-800">Dr. Anya Sharma, M.D.</h4>
          <p className="text-accent font-medium">Cardiologist</p>
          <p className="text-sm text-gray-500">Zenith General Hospital</p>
        </div>
      </div>
      <div className="text-sm text-gray-600 space-y-2">
        <p><strong>Contact:</strong> (555) 123-9876</p>
        <p><strong>Email:</strong> a.sharma@zenith.health</p>
        <p><strong>Experience:</strong> 15+ Years</p>
        <p>Dr. Sharma is a board-certified cardiologist with extensive experience in treating complex cardiovascular conditions. She is dedicated to providing patient-centered care and utilizing the latest advancements in medical technology.</p>
      </div>
    </div>
  );
};

export default ProfileModal;