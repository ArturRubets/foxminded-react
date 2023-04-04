import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getUserTodos,
  selectTodosByUserId,
} from '../features/users/usersSlice';

const UserTodos = () => {
  const { id } = useParams();
  const userId = parseInt(id);
  const dispatch = useDispatch();
  const todos = useSelector((state) => selectTodosByUserId(state, userId));

  useEffect(() => {
    if (!todos) {
      dispatch(getUserTodos(userId));
    }
  }, [dispatch, todos, userId]);

  let content;
  if (todos?.length) {
    content = (
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            key={todo.id}>
            <span className="todo-title">{todo.title}</span>
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={todo.completed}
              readOnly
            />
          </li>
        ))}
      </ul>
    );
  } else {
    content = <p className="error-not-found">Not found</p>;
  }
  return <div className="tab-content">{content}</div>;
};
export default UserTodos;
