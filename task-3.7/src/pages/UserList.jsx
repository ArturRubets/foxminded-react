import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from '../components/Image';
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

  const makeRandomColor = () => {
    let randomColor;
    do {
      randomColor = Math.floor(Math.random() * 16777215).toString(16);
    } while (randomColor === 0xffffff);
    return `#${randomColor}`;
  };

  const getAvatar = ({ avatarUrl, name }) => (
    <Image
      className="image-avatar photo-avatar"
      src={avatarUrl}
      alt="Avatar"
      altElement={() => {
        const firstLetter = name ? name.charAt(0) : '?';
        return (
          <div className="image-avatar avatar-placeholder">
            <span style={{ backgroundColor: makeRandomColor() }}>
              {firstLetter}
            </span>
          </div>
        );
      }}
    />
  );

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
                    {getAvatar(item)}
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
                    <div className="btn-container">
                      <Link to={`${item.id}`}>
                        <button className="btn">Read more</button>
                      </Link>
                      <button className="btn" onClick={() => onDelete(item.id)}>
                        Delete
                      </button>
                    </div>
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
    <section className="section">
      <h2>UsersList</h2>
      {content}
      {buttons}
    </section>
  );
};
export default UsersList;
