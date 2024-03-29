import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchPosts } from './features/posts/postsSlice';
import { fetchTodos } from './features/todos/todosSlice';
import { fetchUsers } from './features/users/usersSlice';
import Error from './pages/Error';
import Home from './pages/Home';
import PostsList from './pages/PostsList';
import SharedLayout from './pages/SharedLayout';
import TodoList from './pages/TodoList';
import UserList from './pages/UserList';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTodos());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="posts-list" element={<PostsList />} />
          <Route path="todo-list" element={<TodoList />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
