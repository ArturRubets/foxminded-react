import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: ['John', 'Amanda', 'Peter'],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
});

export default userSlice.reducer;
