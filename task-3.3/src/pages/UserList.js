import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersUpdated } from '../features/users/usersSlice';

const UserList = () => {
  const dispatch = useDispatch();

  const usersData = useSelector((state) => state.users.data);
  const [users, setUsers] = useState(usersData);

  const onUserChange = (e, index) => {
    const newUsers = [...users];
    newUsers[index] = e.target.value;
    setUsers(newUsers);
  };

  useEffect(() => {
    setUsers(usersData);
  }, [usersData]);

  return (
    <section className="section">
      <h2>UsersList</h2>
      {users.map((user, index) => (
        <div key={index}>
          <input value={user} onChange={(e) => onUserChange(e, index)} />
        </div>
      ))}
      <div className="btn-container">
        <button
          onClick={() => {
            setUsers([...users, '']);
          }}>
          Add new
        </button>
        <button
          onClick={() => {
            const notEmpty = users.filter((user) => user !== '');
            dispatch(usersUpdated(notEmpty));
          }}>
          Save
        </button>
      </div>
    </section>
  );
};

export default UserList;
