import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/posts/postsSlice';
import userReducer from './features/user/userSlice';
import todoReducer from './features/todo/todoSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    todo: todoReducer,
  },
});
