import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todosUpdated } from '../features/todos/todosSlice';
import List from '../components/List';

const TodoList = () => {
  const dispatch = useDispatch();

  const todosData = useSelector((state) => state.todos.data);
  const [todos, setTodos] = useState(todosData);

  useEffect(() => {
    setTodos(todosData);
  }, [todosData]);

  const onTodoChange = (e, index) => {
    const newTodos = [...todos];
    newTodos[index] = e.target.value;
    setTodos(newTodos);
  };

  const onAdd = () => {
    setTodos([...todos, '']);
  };

  const onSave = () => {
    const notEmpty = todos.filter((todo) => todo !== '');
    dispatch(todosUpdated(notEmpty));
  };

  return (
    <List
      title={'TodosList'}
      data={todos}
      onAdd={onAdd}
      onChange={onTodoChange}
      onSave={onSave}
    />
  );
};

export default TodoList;
