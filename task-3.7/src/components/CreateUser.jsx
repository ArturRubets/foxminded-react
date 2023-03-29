import { useState } from "react";

const CreateUser = () => {
  const defaultNewUser = { name: '', username: '' };
  const [newUser, setNewUser] = useState(defaultNewUser);

  return (
    <div className="fill-new-user">
      <hr />
      <article className="excerpt">
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
  );
};
export default CreateUser;
