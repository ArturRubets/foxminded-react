import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

const SharedLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};
export default SharedLayout;
