import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: ['gym', 'shopping', 'eating'],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
});

export default todoSlice.reducer;
