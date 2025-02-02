import React from 'react';
import './App.css';
import CounterTimer from '@/Components/CounterTime/CounterTimer';



const App: React.FC = () => {
    return (
        <div>
            { <CounterTimer/>}

        </div>
    );
};

export default App;
