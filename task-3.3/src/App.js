import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './pages/Error';
import PostsList from './pages/PostsList';
import SharedLayout from './pages/SharedLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<PostsList />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
