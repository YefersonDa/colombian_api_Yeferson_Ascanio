import React, { useState } from 'react';
import './Tabs.css'; // Importa estilos opcionales
import Tab1 from './Tab1';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  // Función para cambiar la pestaña activa
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
          Tab 1
        </button>
        <button 
          className={activeTab === 2 ? 'tab active' : 'tab'}
          onClick={() => handleTabClick(2)}
        >
          Tab 2
        </button>
        <button 
          className={activeTab === 3 ? 'tab active' : 'tab'}
          onClick={() => handleTabClick(3)}
        >
          Tab 3
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 1 && <div><Tab1/></div>}
        {activeTab === 2 && <div>Contenido de la Tab 2</div>}
        {activeTab === 3 && <div>Contenido de la Tab 3</div>}
      </div>
    </div>
  );
};

export default Tabs;