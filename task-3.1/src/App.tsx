import React from 'react';
import './App.css';
import CounterClassComponent from './components/CounterClassComponent';

const App: React.FC = () => (
  <div className="App">
    <CounterClassComponent initialValue={0} />
  </div>
);

export default App;
