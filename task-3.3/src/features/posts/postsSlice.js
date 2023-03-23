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
    postAdd(state, { payload }) {
      state.data.push(payload);
    },
  },
});

export const { postsUpdated, postAdd } = postsSlice.actions;

export default postsSlice.reducer;
