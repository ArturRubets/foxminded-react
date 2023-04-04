import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getRandomColor } from '../../helpers/helpers';

const url = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
  data: [],
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, thunkAPI) => {
    try {
      const resp = await axios(url);
      // After receiving users, generate the color of the avatar
      return resp.data.map(generateAvatarColor);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'something went wrong while receiving the users'
      );
    }
  }
);

export const postUsers = createAsyncThunk(
  'users/postUsers',
  async (user, thunkAPI) => {
    try {
      const resp = await axios.post(url, user);
      // If we do not need to send data to the server, then we generate the color already after the post request
      return generateAvatarColor(resp.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'something went wrong while posting the users'
      );
    }
  }
);

export const deleteUsers = createAsyncThunk(
  'users/deleteUsers',
  async (user, thunkAPI) => {
    try {
      await axios.delete(url + `/${user.id}`);
      // the call does not return the id, so I return the id in this way
      return user.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'something went wrong while deleting the users'
      );
    }
  }
);

// Expects a userId parameter of numeric type
export const getUserTodos = createAsyncThunk(
  'users/getUserTodos',
  async (userId, thunkAPI) => {
    try {
      const resp = await axios(`${url}/${userId}/todos`);
      return { todos: resp.data, userId };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'something went wrong while receiving user todos'
      );
    }
  }
);

// Expects a userId parameter of numeric type
export const getUserAlbums = createAsyncThunk(
  'users/getUserAlbums',
  async (userId, thunkAPI) => {
    try {
      const resp = await axios(`${url}/${userId}/albums`);
      return { albums: resp.data, userId };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'something went wrong while receiving user albums'
      );
    }
  }
);

// Expects a userId parameter of numeric type
export const getUserPosts = createAsyncThunk(
  'users/getUserPosts',
  async (userId, thunkAPI) => {
    try {
      const resp = await axios(`${url}/${userId}/posts`);
      return { posts: resp.data, userId };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'something went wrong while receiving user posts'
      );
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersUpdated(state, { payload }) {
      state.data = payload;
      saveUsersToLocalStorage(state.data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        saveUsersToLocalStorage(state.data);
      })
      .addCase(postUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postUsers.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        // id always has the same value, this is a problem for displaying the list of users
        const { name, username, avatarUrl, avatarColor } = payload;
        const maxId = state.data.reduce(
          (max, item) => (item.id > max ? item.id : max),
          0
        );
        state.data.push({
          id: maxId + 1,
          name,
          username,
          ...(avatarUrl && { avatarUrl }),
          avatarColor,
        });
        saveUsersToLocalStorage(state.data);
      })
      .addCase(postUsers.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteUsers.fulfilled, (state, { payload }) => {
        state.data = state.data.filter((item) => item.id !== payload);
        saveUsersToLocalStorage(state.data);
      })
      .addCase(getUserTodos.fulfilled, (state, { payload }) => {
        const { userId, todos } = payload;
        const user = state.data.find((user) => user.id === userId);
        if (user) {
          const newTodos = todos.map(({ id, completed, title }) => ({
            id,
            completed,
            title,
          }));
          user.todos = newTodos;
          saveUsersToLocalStorage(state.data);
        }
      })
      .addCase(getUserAlbums.fulfilled, (state, { payload }) => {
        const { userId, albums } = payload;
        const user = state.data.find((user) => user.id === userId);
        if (user) {
          const newAlbums = albums.map(({ id, title }) => ({
            id,
            title,
          }));
          user.albums = newAlbums;
          saveUsersToLocalStorage(state.data);
        }
      })
      .addCase(getUserPosts.fulfilled, (state, { payload }) => {
        const { userId, posts } = payload;
        const user = state.data.find((user) => user.id === userId);
        if (user) {
          const newPosts = posts.map(({ id, title, body }) => ({
            id,
            title,
            body,
          }));
          user.posts = newPosts;
          saveUsersToLocalStorage(state.data);
        }
      });
  },
});

export const { usersUpdated, usersAdded } = usersSlice.actions;

// Expects a userId parameter of numeric type
export const selectUserById = (state, userId) =>
  state.users.data.find((user) => user.id === userId);

// Expects a userId parameter of numeric type
export const selectTodosByUserId = (state, userId) =>
  selectUserById(state, userId)?.todos;

// Expects a userId parameter of numeric type
export const selectAlbumsByUserId = (state, userId) =>
  selectUserById(state, userId)?.albums;

// Expects a userId parameter of numeric type
export const selectPostsByUserId = (state, userId) =>
  selectUserById(state, userId)?.posts;

export default usersSlice.reducer;

const localStorageKey = 'users';

// Function to retrieve data from local storage
const loadUsersFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem(localStorageKey);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.log('Error while loading users from localStorage: ', error);
    return undefined;
  }
};

// Function for saving data in local storage
const saveUsersToLocalStorage = (state) => {
  try {
    const serializedData = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serializedData);
  } catch (error) {
    console.log('Error while saving users to localStorage: ', error);
  }
};

export const fetchUsers = () => async (dispatch, getState) => {
  const state = getState();
  const usersData = state.users.data;

  if (usersData.length === 0) {
    // If there is no data in the Redux store, check if it is stored in LocalStorage
    const usersFromLocalStorage = loadUsersFromLocalStorage();
    if (usersFromLocalStorage) {
      dispatch(usersUpdated(usersFromLocalStorage));
    } else {
      // If there is no data in LocalStorage, fetch the data from the API
      dispatch(getUsers());
    }
  }
};

const generateAvatarColor = (user) => ({
  ...user,
  avatarColor: getRandomColor(),
});
