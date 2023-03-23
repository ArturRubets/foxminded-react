import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: ['John', 'Amanda', 'Peter'],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
});

export default usersSlice.reducer;
