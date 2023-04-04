import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="link" activeclassname="active">
        Home
      </NavLink>
      <NavLink to="/posts-list" className="link" activeclassname="active">
        PostsList
      </NavLink>
      <NavLink to="/todo-list" className="link" activeclassname="active">
        TodoList
      </NavLink>
      <NavLink to="/user-list" className="link" activeclassname="active">
        UserList
      </NavLink>
    </nav>
  );
};

export default Navigation;
