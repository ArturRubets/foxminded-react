import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="link" end>
        Home
      </NavLink>
      <NavLink to="/posts-list" className="link">
        PostsList
      </NavLink>
      <NavLink to="/todo-list" className="link">
        TodoList
      </NavLink>
      <NavLink to="/user-list" className="link">
        UserList
      </NavLink>
    </nav>
  );
};

export default Navigation;
