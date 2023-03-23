import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: ['gym', 'shopping', 'eating'],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
});

export default todosSlice.reducer;
