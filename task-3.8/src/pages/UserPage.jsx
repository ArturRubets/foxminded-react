import { Link, NavLink, Outlet, useParams } from 'react-router-dom';

const UserPage = () => {
  const { id } = useParams();

  const navbar = (
    <nav className="navbar">
      <NavLink to={`/user-list/${id}`} className="link" end>
        General
      </NavLink>
      <NavLink to={'albums'} className="link">
        Albums
      </NavLink>
      <NavLink to={'todos'} className="link">
        Todos
      </NavLink>
      <NavLink to={'posts'} className="link">
        Posts
      </NavLink>
    </nav>
  );

  const buttons = (
    <div className="btn-container">
      <Link to={'/user-list'}>
        <button type="button" className="btn">
          Back
        </button>
      </Link>
    </div>
  );

  return (
    <section className="section">
      {navbar}
      <Outlet />
      {buttons}
    </section>
  );
};
export default UserPage;
