import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import InventoryDashboard from './components/InventoryDashboard';

type CurrentPage = 'landing' | 'inventory' | 'routes';

const App = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('landing');

  const handleNavigation = (page: 'inventory' | 'routes') => {
    if (page === 'routes') {
      // For now, show an alert since the truck route dashboard is not implemented yet
      alert('Truck Route Dashboard will be integrated here. Please provide your truck route dashboard component.');
      return;
    }
    setCurrentPage(page);
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  if (currentPage === 'landing') {
    return <LandingPage onNavigate={handleNavigation} />;
  }

  if (currentPage === 'inventory') {
    return (
      <div>
        {/* Back button */}
        <div className="bg-white shadow-sm border-b px-8 py-4">
          <button 
            onClick={handleBackToLanding}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Dashboard</span>
          </button>
        </div>
        <InventoryDashboard />
      </div>
    );
  }

  return null;
};

export default App;