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

export const deletePosts = createAsyncThunk(
  'posts/deletePosts',
  async (post, thunkAPI) => {
    try {
      await axios.delete(url + `/${post.id}`);
      // the call does not return the id, so I return the id in this way
      return post.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'something went wrong while deleting the posts'
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
      savePostsToLocalStorage(state.data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        savePostsToLocalStorage(state.data);
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
        savePostsToLocalStorage(state.data);
      })
      .addCase(deletePosts.fulfilled, (state, { payload }) => {
        state.data = state.data.filter((item) => item.id !== payload);
        savePostsToLocalStorage(state.data);
      });
  },
});

export const { postsUpdated, postsAdded } = postsSlice.actions;

export default postsSlice.reducer;

const localStorageKey = 'posts';

// Function to retrieve data from local storage
const loadPostsFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem(localStorageKey);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.log('Error while loading posts from localStorage: ', error);
    return undefined;
  }
};

// Function for saving data in local storage
const savePostsToLocalStorage = (state) => {
  try {
    const serializedData = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serializedData);
  } catch (error) {
    console.log('Error while saving posts to localStorage: ', error);
  }
};

export const fetchPosts = () => async (dispatch, getState) => {
  const state = getState();
  const postsData = state.posts.data;

  if (postsData.length === 0) {
    // If there is no data in the Redux store, check if it is stored in LocalStorage
    const postsFromLocalStorage = loadPostsFromLocalStorage();
    if (postsFromLocalStorage) {
      dispatch(postsUpdated(postsFromLocalStorage));
    } else {
      // If there is no data in LocalStorage, fetch the data from the API
      dispatch(getPosts());
    }
  }
};
