import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AddProject from './components/AddProject';
import MMUTasks from './components/MMUTasks';

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderComponent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'AddProject':
        return <AddProject />;
      case 'MMUTasks':
        return <MMUTasks />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="flex-1 p-4 bg-gray-100 overflow-auto">{renderComponent()}</div>
    </div>
  );
}

export default App;
