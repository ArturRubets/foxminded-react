import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: ['nature', 'weather', 'sun'],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
});

export default postsSlice.reducer;
