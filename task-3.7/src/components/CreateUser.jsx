import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postUsers } from '../features/users/usersSlice';

const CreateUser = () => {
  const [user, setUser] = useState({ name: '', username: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCancel = () => {
    navigate(-1);
  };

  const onCreateUser = () => {
    dispatch(postUsers(user));
    navigate(-1);
  };

  const onChangeName = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const onChangeUsername = (e) => {
    setUser({ ...user, username: e.target.value });
  };

  const buttons = (
    <div className="btn-container">
      <button className="btn btn-hipster" onClick={onCancel}>
        Cancel
      </button>
      <button className="btn" onClick={onCreateUser}>
        Create
      </button>
    </div>
  );

  return (
    <div className="fill-new-user">
      <hr />
      <article className="excerpt">
        <label>
          Name:
          <input type="text" value={user.name} onChange={onChangeName} />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={user.username}
            onChange={onChangeUsername}
          />
        </label>
        {buttons}
      </article>
    </div>
  );
};
export default CreateUser;
