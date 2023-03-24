import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: ['gym', 'shopping', 'eating'],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todosUpdated(state, { payload }) {
      state.data = payload;
    },
  },
});

export const { todosUpdated } = todosSlice.actions;

export default todosSlice.reducer;
