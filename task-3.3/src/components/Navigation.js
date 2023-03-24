import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}>
        Home
      </NavLink>
      <NavLink
        to="/posts-list"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}>
        PostsList
      </NavLink>
      <NavLink
        to="/todo-list"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}>
        TodoList
      </NavLink>
      <NavLink
        to="/user-list"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}>
        UserList
      </NavLink>
    </nav>
  );
};

export default Navigation;
