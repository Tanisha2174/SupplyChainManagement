import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import InventoryDashboard from './components/InventoryDashboard';
import RoutingDashBoard from './components/RoutingDashBoard'

type CurrentPage = 'landing' | 'inventory' | 'routes';

const App = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('landing');

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handleNavigation = (page: 'inventory' | 'routes') => {
    setCurrentPage(page);
    window.scrollTo({
      top : 0,
      behavior : 'smooth'
    });
  };

  const renderBackButton = () => (
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
  );

  if (currentPage === 'landing') {
    return <LandingPage onNavigate={handleNavigation} />;
  }

  if (currentPage === 'inventory') {
    return (
      <div>
        {renderBackButton()}
        <InventoryDashboard />
      </div>
    );
  }
  if(currentPage == 'routes'){
    return(
       <div>
        {renderBackButton()}
        <RoutingDashBoard />
      </div>
    )
  }

  return null;
};

export default App;
