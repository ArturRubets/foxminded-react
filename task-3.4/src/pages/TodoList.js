import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTodos,
  postTodos,
  todosUpdated,
} from '../features/todos/todosSlice';

const TodosList = () => {
  const [isAdd, setIsAdd] = useState(false);
  const defaultNewTodo = { title: '', completed: false };
  const [newTodo, setNewTodo] = useState(defaultNewTodo);

  const dispatch = useDispatch();

  const todosData = useSelector((state) => state.todos.data);
  const [todos, setTodos] = useState(todosData);

  useEffect(() => {
    setTodos(todosData);
  }, [todosData]);

  const onChange = (value, id, property) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const newListTodos = [...todos];
    const newTodo = { ...newListTodos[index] };
    newTodo[property] = value;
    newListTodos[index] = newTodo;
    setTodos(newListTodos);
  };

  const onChangeTitle = (e, id) => {
    onChange(e.target.value, id, 'title');
  };

  const onChangeCompleted = (e, id) => {
    onChange(e.target.checked, id, 'completed');
  };

  const onAdd = () => {
    setIsAdd(true);
  };

  const onCancel = () => {
    setIsAdd(false);
  };

  const onDelete = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    dispatch(deleteTodos(todo));
  };

  const onSave = () => {
    // We cancel the addition of the todo
    setIsAdd(false);
    setNewTodo({ ...defaultNewTodo });

    dispatch(todosUpdated(todos));

    if (newTodo.title || newTodo.body) {
      dispatch(postTodos(newTodo));
    }
  };

  return (
    <section className="section todos-list">
      <h2>TodosList</h2>
      {todos.map((item, index) => (
        <React.Fragment key={index}>
          <article className="todo-excerpt">
            <label>
              Todo Title:
              <input
                type="text"
                value={item.title}
                onChange={(e) => onChangeTitle(e, item.id)}
              />
            </label>
            <label>
              Completed:
              <input
                type="checkbox"
                checked={item.completed}
                onChange={(e) => onChangeCompleted(e, item.id)}
              />
            </label>
            <button className="btn" onClick={() => onDelete(item.id)}>
              Delete
            </button>
          </article>
        </React.Fragment>
      ))}
      {isAdd && (
        <div className="fill-new-todo">
          <hr />
          <article className="todo-excerpt">
            <label>
              Todo Title:
              <input
                type="text"
                value={newTodo.title}
                onChange={(e) => {
                  setNewTodo({ ...newTodo, title: e.target.value });
                }}
              />
            </label>
            <label>
              Completed:
              <input
                type="checkbox"
                checked={newTodo.completed}
                onChange={(e) => {
                  setNewTodo({ ...newTodo, completed: e.target.value });
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
export default TodosList;
