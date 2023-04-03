import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { deleteUsers, usersUpdated } from '../features/users/usersSlice';
import { StrictModeDroppable as Droppable } from '../helpers/StrictModeDroppable';

const UsersList = () => {
  const usersData = useSelector((state) => state.users.data);
  const [users, setUsers] = useState(usersData);
  const [isDragEnd, setIsDragEnd] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setUsers(usersData);
  }, [usersData]);

  useEffect(() => {
    if (isDragEnd) {
      dispatch(usersUpdated(users));
      setIsDragEnd(false);
    }
  }, [dispatch, users, isDragEnd]);

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

  const onChangeUserName = (e, id) => {
    onChange(e, id, 'userName');
  };

  const onDelete = (id) => {
    const user = users.find((user) => user.id === id);
    dispatch(deleteUsers(user));
  };

  const onSave = () => {
    dispatch(usersUpdated(users));
  };

  const onDragEnd = (result) => {
    if (!result?.destination) return;
    setIsDragEnd(true);
    const items = [...users];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setUsers(items);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? 'var(--primary-100)' : 'inherit',
    cursor: isDragging ? 'all-scroll' : 'pointer',
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const content = (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="users">
        {(provided) => (
          <section {...provided.droppableProps} ref={provided.innerRef}>
            {users.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}>
                {(provided, snapshot) => (
                  <article
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    ref={provided.innerRef}
                    className="excerpt">
                    <label>
                      Name:
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => onChangeName(e, item.id)}
                      />
                    </label>
                    <label>
                      User name:
                      <input
                        type="text"
                        value={item.userName}
                        onChange={(e) => onChangeUserName(e, item.id)}
                      />
                    </label>
                    <button className="btn" onClick={() => onDelete(item.id)}>
                      Delete
                    </button>
                  </article>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );

  const buttons = (
    <div className="btn-container">
      <Link to={'add-new'}>
        <button className="btn">Add new</button>
      </Link>
      <button className="btn" onClick={onSave}>
        Save
      </button>
    </div>
  );

  return (
    <section className="section users-list">
      <h2>UsersList</h2>
      {content}
      <Outlet />
      {buttons}
    </section>
  );
};
export default UsersList;
