import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectUserById } from '../features/users/usersSlice';

const UserPage = () => {
  const { id } = useParams();
  const userId = parseInt(id);
  const user = useSelector((state) => selectUserById(state, userId));
  if (user) {
    return <div>{user?.name}</div>;
  } else {
    return 'Not found';
  }
};
export default UserPage;
