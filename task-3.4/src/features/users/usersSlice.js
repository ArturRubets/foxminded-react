import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: ['John', 'Amanda', 'Peter'],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersUpdated(state, { payload }) {
      state.data = payload;
    },
  },
});

export const { usersUpdated } = usersSlice.actions;

export default usersSlice.reducer;
