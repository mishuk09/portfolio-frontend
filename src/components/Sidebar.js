import React from 'react';

function Sidebar({ setActiveTab, activeTab }) {
    const tabs = ['Dashboard', 'AddProject', 'MMUTasks','ActiveStatus'];

    return (
        <div className="w-64 bg-gray-900 text-white shadow-lg h-full p-4">
            <h2 className="text-2xl font-bold mb-6">My Dashboard</h2>
            <ul className="space-y-3">
                {tabs.map((tab) => (
                    <li
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`cursor-pointer p-2 rounded-lg ${activeTab === tab ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'
                            }`}
                    >
                        {tab}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
