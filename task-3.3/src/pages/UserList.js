import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersUpdated } from '../features/users/usersSlice';
import List from '../components/List';

const UserList = () => {
  const dispatch = useDispatch();

  const usersData = useSelector((state) => state.users.data);
  const [users, setUsers] = useState(usersData);

  useEffect(() => {
    setUsers(usersData);
  }, [usersData]);

  const onUserChange = (e, index) => {
    const newUsers = [...users];
    newUsers[index] = e.target.value;
    setUsers(newUsers);
  };

  const onAdd = () => {
    setUsers([...users, '']);
  };

  const onSave = () => {
    const notEmpty = users.filter((user) => user !== '');
    dispatch(usersUpdated(notEmpty));
  };

  return (
    <List
      title={'UsersList'}
      data={users}
      onAdd={onAdd}
      onChange={onUserChange}
      onSave={onSave}
    />
  );
};

export default UserList;
