import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { decrement, increment, selectCounterValue } from './counterSlice'

const Counter = () => {
  const dispatch = useDispatch()
  const count = useSelector(selectCounterValue)

  return (
    <div>
      <button
        className="button"
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <span className="value">{count}</span>
      <button
        className="button"
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        +
      </button>
    </div>
  )
}

export default Counter
