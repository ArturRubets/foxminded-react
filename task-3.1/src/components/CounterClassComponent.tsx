import React, { Component } from 'react';
import './styles.css';

interface Props {
  initialValue: number;
}

interface State {
  count: number;
}

export class CounterClassComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: props.initialValue,
    };
    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  render() {
    return (
      <div className="counter">
        <p className="counter__text">
          <span className="counter__text--signature">Count:</span>
          {this.state.count}
        </p>
        <button className="counter__btn" onClick={this.increment}>
          Increment
        </button>
      </div>
    );
  }
}

export default CounterClassComponent;
