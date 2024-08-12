import React, { useState } from 'react';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

const App = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const renderTab = () => {
        switch (activeTab) {
            case 'tab1':
                return <Tab1 />;
            case 'tab2':
                return <Tab2 />;
            case 'tab3':
                return <Tab3 />;
            default:
                return <Tab1 />;
        }
    };

    return (
        <div>
            <nav>
                <button onClick={() => setActiveTab('tab1')}>Presidentes</button>
                <button onClick={() => setActiveTab('tab2')}>Aeropuertos</button>
                <button onClick={() => setActiveTab('tab3')}>Atracciones Turísticas</button>
            </nav>
            <div>
                {renderTab()}
            </div>
        </div>
    );
};

export default App;