import React, { useState } from 'react';
import './styles.css';

interface Props {
  initialValue: number;
}

const CounterFuncComponent: React.FC<Props> = ({ initialValue }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);

  return (
    <div className="counter">
      <p className="counter__text">
        <span className="counter__text--signature">Count:</span>
        {count}
      </p>
      <button className="counter__btn" onClick={increment}>
        Increment
      </button>
    </div>
  );
};

export default CounterFuncComponent;
