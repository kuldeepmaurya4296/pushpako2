'use client';
import { useState } from 'react';
import HeaderBar from './HeaderBar';
import NavigationTabs from './NavigationTabs';
import PortfolioTab from './PortfolioTab';
import PerformanceTab from './PerformanceTab';
import NewsTab from './NewsTab';
import ReportsTab from './ReportsTab';
import ProfileTab from './ProfileTab';

export default function InvestorDashboard({ investor }) {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleProfileAction = (action) => {
    if (action === 'view' || action === 'edit') {
      setActiveTab('profile');
      setIsEditingProfile(action === 'edit');
    }
  };

  return (
    <div className="min-h-screen bg-[#060B18] text-white p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <HeaderBar investor={investor} onProfileAction={handleProfileAction} />
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content based on active tab */}
        <div className="mt-6">
          {activeTab === 'profile' && <ProfileTab investor={investor} isEditing={isEditingProfile} />}
          {activeTab === 'portfolio' && <PortfolioTab investor={investor} />}
          {activeTab === 'performance' && <PerformanceTab />}
          {activeTab === 'news' && <NewsTab />}
          {activeTab === 'reports' && <ReportsTab />}
        </div>
      </div>
    </div>
  );
}