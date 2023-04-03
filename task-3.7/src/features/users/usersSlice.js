import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
  data: [],
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
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
      return resp.data;
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
      .addCase(postUsers.fulfilled, (state, { payload }) => {
        // id always has the same value, this is a problem for displaying the list of users
        const { name, userName } = payload;
        const maxId = state.data.reduce((max, item) => {
          return item.id > max ? item.id : max;
        }, 0);
        state.data.push({
          id: maxId + 1,
          name,
          userName,
        });
        saveUsersToLocalStorage(state.data);
      })
      .addCase(deleteUsers.fulfilled, (state, { payload }) => {
        state.data = state.data.filter((item) => item.id !== payload);
        saveUsersToLocalStorage(state.data);
      });
  },
});

export const { usersUpdated, usersAdded } = usersSlice.actions;

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
