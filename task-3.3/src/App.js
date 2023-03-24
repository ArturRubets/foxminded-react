import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './pages/Error';
import PostsList from './pages/PostsList';
import SharedLayout from './pages/SharedLayout';
import TodoList from './pages/TodoList';
import UserList from './pages/UserList';
import Home from './pages/Home';

function App() {
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
