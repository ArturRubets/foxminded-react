import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUsers,
  postUsers,
  usersUpdated,
} from '../features/users/usersSlice';

const UsersList = () => {
  const [isAdd, setIsAdd] = useState(false);
  const defaultNewUser = { name: '', username: '' };
  const [newUser, setNewUser] = useState(defaultNewUser);
  const usersData = useSelector((state) => state.users.data);
  const [users, setUsers] = useState(usersData);

  const dispatch = useDispatch();

  useEffect(() => {
    setUsers(usersData);
  }, [usersData]);

  const onChange = (e, id, property) => {
    const index = users.findIndex((user) => user.id === id);
    const newListUsers = [...users];
    const newUser = { ...newListUsers[index] };
    newUser[property] = e.target.value;
    newListUsers[index] = newUser;
    setUsers(newListUsers);
  };

  const onChangeName = (e, id) => {
    onChange(e, id, 'name');
  };

  const onChangeUsername = (e, id) => {
    onChange(e, id, 'username');
  };

  const onAdd = () => {
    setIsAdd(true);
  };

  const onCancel = () => {
    setIsAdd(false);
  };

  const onDelete = (id) => {
    const user = users.find((user) => user.id === id);
    dispatch(deleteUsers(user));
  };

  const onSave = () => {
    // We cancel the addition of the user
    setIsAdd(false);
    setNewUser({ ...defaultNewUser });

    dispatch(usersUpdated(users));

    if (newUser.name || newUser.username) {
      dispatch(postUsers(newUser));
    }
  };

  return (
    <section className="section users-list">
      <h2>UsersList</h2>
      {users.map((item) => (
        <React.Fragment key={item.id}>
          <article className="user-excerpt">
            <label>
              Name:
              <input
                type="text"
                value={item.name}
                onChange={(e) => onChangeName(e, item.id)}
              />
            </label>
            <label>
              Username:
              <input
                type="text"
                value={item.username}
                onChange={(e) => onChangeUsername(e, item.id)}
              />
            </label>
            <button className="btn" onClick={() => onDelete(item.id)}>
              Delete
            </button>
          </article>
        </React.Fragment>
      ))}
      {isAdd && (
        <div className="fill-new-user">
          <hr />
          <article className="user-excerpt">
            <label>
              Name:
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => {
                  setNewUser({ ...newUser, name: e.target.value });
                }}
              />
            </label>
            <label>
              Username:
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => {
                  setNewUser({ ...newUser, username: e.target.value });
                }}
              />
            </label>
          </article>
        </div>
      )}
      <div className="btn-container">
        {isAdd && (
          <button className="btn btn-hipster" onClick={onCancel}>
            Cancel
          </button>
        )}
        {!isAdd && (
          <button className="btn" onClick={onAdd}>
            Add new
          </button>
        )}
        <button className="btn" onClick={onSave}>
          Save
        </button>
      </div>
    </section>
  );
};
export default UsersList;
