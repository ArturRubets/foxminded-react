import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import UserAlbums from './components/UserAlbums';
import UserForm from './components/UserForm';
import UserGeneral from './components/UserGeneral';
import UserPosts from './components/UserPosts';
import UserTodos from './components/UserTodos';
import { fetchPosts } from './features/posts/postsSlice';
import { fetchTodos } from './features/todos/todosSlice';
import { fetchUsers } from './features/users/usersSlice';
import Error from './pages/Error';
import Home from './pages/Home';
import PostsList from './pages/PostsList';
import SharedLayout from './pages/SharedLayout';
import TodoList from './pages/TodoList';
import UserList from './pages/UserList';
import UserPage from './pages/UserPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTodos());
    dispatch(fetchUsers());
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="posts-list" element={<PostsList />} />
        <Route path="todo-list" element={<TodoList />} />
        <Route path="user-list">
          <Route index element={<UserList />} />
          <Route path="add-new" element={<UserForm />} />
          <Route path=":id" element={<UserPage />}>
            <Route index element={<UserGeneral />} />
            <Route path="todos" element={<UserTodos />} />
            <Route path="albums" element={<UserAlbums />} />
            <Route path="posts" element={<UserPosts />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
export default App;
