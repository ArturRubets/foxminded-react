import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos';

const initialState = {
  data: [],
};

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async (_, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'something went wrong while receiving the todos'
      );
    }
  }
);

export const postTodos = createAsyncThunk(
  'todos/postTodos',
  async (todo, thunkAPI) => {
    try {
      const resp = await axios.post(url, todo);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'something went wrong while posting the todos'
      );
    }
  }
);

export const deleteTodos = createAsyncThunk(
  'todos/deleteTodos',
  async (todo, thunkAPI) => {
    try {
      await axios.delete(url + `/${todo.id}`);
      // the call does not return the id, so I return the id in this way
      return todo.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'something went wrong while deleting the todos'
      );
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todosUpdated(state, { payload }) {
      state.data = payload;
      saveTodosToLocalStorage(state.data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
        saveTodosToLocalStorage(state.data);
      })
      .addCase(postTodos.fulfilled, (state, { payload }) => {
        // id always has the same value, this is a problem for displaying the list of todos
        const { title, completed } = payload;
        const maxId = state.data.reduce((max, item) => {
          return item.id > max ? item.id : max;
        }, 0);
        state.data.push({
          id: maxId + 1,
          title,
          completed,
        });
        saveTodosToLocalStorage(state.data);
      })
      .addCase(deleteTodos.fulfilled, (state, { payload }) => {
        state.data = state.data.filter((item) => item.id !== payload);
        saveTodosToLocalStorage(state.data);
      });
  },
});

export const { todosUpdated, todosAdded } = todosSlice.actions;

export default todosSlice.reducer;

const localStorageKey = 'todos';

// Function to retrieve data from local storage
const loadTodosFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem(localStorageKey);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.log('Error while loading todos from localStorage: ', error);
    return undefined;
  }
};

// Function for saving data in local storage
const saveTodosToLocalStorage = (state) => {
  try {
    const serializedData = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serializedData);
  } catch (error) {
    console.log('Error while saving todos to localStorage: ', error);
  }
};

export const fetchTodos = () => async (dispatch, getState) => {
  const state = getState();
  const todosData = state.todos.data;

  if (todosData.length === 0) {
    // If there is no data in the Redux store, check if it is stored in LocalStorage
    const todosFromLocalStorage = loadTodosFromLocalStorage();
    if (todosFromLocalStorage) {
      dispatch(todosUpdated(todosFromLocalStorage));
    } else {
      // If there is no data in LocalStorage, fetch the data from the API
      dispatch(getTodos());
    }
  }
};
