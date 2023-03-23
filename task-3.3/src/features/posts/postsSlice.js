import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: ['nature', 'weather', 'sun'],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsUpdated(state, { payload }) {
      state.posts = payload;
    },
    postAdd(state, { payload }) {
      state.posts.push(payload);
    },
  },
});

export const { postsUpdated, postAdd } = postsSlice.actions;

export default postsSlice.reducer;
