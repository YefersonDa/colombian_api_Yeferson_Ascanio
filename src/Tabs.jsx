import { useState } from 'react';
import './Tabs.css';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';



const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <div className="tabs">
        <button 
          className={activeTab === 1 ? 'tab active' : 'tab'}
          onClick={() => handleTabClick(1)}
        >
          Presidentes
        </button>
        <button 
          className={activeTab === 2 ? 'tab active' : 'tab'}
          onClick={() => handleTabClick(2)}
        >
          Atracciones
        </button>
        <button 
          className={activeTab === 3 ? 'tab active' : 'tab'}
          onClick={() => handleTabClick(3)}
        >
          Aeropuertos
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 1 && <div><Tab1/></div>}
        {activeTab === 2 && <div><Tab2/></div>}
        {activeTab === 3 && <div><Tab3/></div>}
      </div>
    </div>
  );
};

export default Tabs;