import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  data: [],
};

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'something went wrong while receiving the posts'
      );
    }
  }
);

export const postPosts = createAsyncThunk(
  'posts/postPosts',
  async (post, thunkAPI) => {
    try {
      const resp = await axios.post(url, post);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'something went wrong while posting the posts'
      );
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsUpdated(state, { payload }) {
      state.data = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        console.error(payload);
        state.isLoading = false;
      })
      .addCase(postPosts.fulfilled, (state, { payload }) => {
        // id always has the same value, this is a problem for displaying the list of posts
        const { title, body } = payload;
        const maxId = state.data.reduce((max, item) => {
          return item.id > max ? item.id : max;
        }, 0);
        state.data.push({
          id: maxId + 1,
          title,
          body,
        });
      });
  },
});

export const { postsUpdated, postsAdded } = postsSlice.actions;

export default postsSlice.reducer;
