import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todosUpdated } from '../features/todos/todosSlice';

const TodoList = () => {
  const dispatch = useDispatch();

  const todosData = useSelector((state) => state.todos.data);
  const [todos, setTodos] = useState(todosData);

  const onTodoChange = (e, index) => {
    const newTodos = [...todos];
    newTodos[index] = e.target.value;
    setTodos(newTodos);
  };

  useEffect(() => {
    setTodos(todosData);
  }, [todosData]);

  return (
    <section className="section">
      <h2>TodosList</h2>
      {todos.map((todo, index) => (
        <div key={index}>
          <input value={todo} onChange={(e) => onTodoChange(e, index)} />
        </div>
      ))}
      <div className="btn-container">
        <button
          onClick={() => {
            setTodos([...todos, '']);
          }}>
          Add new
        </button>
        <button
          onClick={() => {
            const notEmpty = todos.filter((todo) => todo !== '');
            dispatch(todosUpdated(notEmpty));
          }}>
          Save
        </button>
      </div>
    </section>
  );
};

export default TodoList;
