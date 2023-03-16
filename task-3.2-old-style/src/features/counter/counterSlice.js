const initialState = {
  value: 0,
}

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'counter/increment':
      return {
        ...state,
        value: state.value + 1,
      }

    case 'counter/decrement':
      return {
        ...state,
        value: state.value - 1,
      }

    default:
      return state
  }
}

export const increment = () => ({
  type: 'counter/increment',
})

export const decrement = () => ({
  type: 'counter/decrement',
})

export const selectCounterValue = (state) => state.counter.value
