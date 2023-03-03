import React from 'react';
import './App.css';
import CounterClassComponent from './components/CounterClassComponent';
import CounterFuncComponent from './components/CounterFuncComponent';

const App: React.FC = () => (
  <div className="App">
    <CounterClassComponent initialValue={-10} />
    <CounterFuncComponent initialValue={10} />
  </div>
);

export default App;
