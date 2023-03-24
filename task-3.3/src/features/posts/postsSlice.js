import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: ['nature', 'weather', 'sun'],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsUpdated(state, { payload }) {
      state.data = payload;
    },
  },
});

export const { postsUpdated } = postsSlice.actions;

export default postsSlice.reducer;
