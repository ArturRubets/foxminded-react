import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePosts,
  postPosts,
  postsUpdated,
} from '../features/posts/postsSlice';
import { StrictModeDroppable as Droppable } from '../helpers/StrictModeDroppable';

const PostsList = () => {
  const [isAdd, setIsAdd] = useState(false);
  const defaultNewPost = { title: '', body: '' };
  const [newPost, setNewPost] = useState(defaultNewPost);
  const postsData = useSelector((state) => state.posts.data);
  const [posts, setPosts] = useState(postsData);

  const dispatch = useDispatch();

  useEffect(() => {
    setPosts(postsData);
  }, [postsData]);

  const onChange = (e, id, property) => {
    const index = posts.findIndex((post) => post.id === id);
    const newListPosts = [...posts];
    const newPost = { ...newListPosts[index] };
    newPost[property] = e.target.value;
    newListPosts[index] = newPost;
    setPosts(newListPosts);
  };

  const onChangeTitle = (e, id) => {
    onChange(e, id, 'title');
  };

  const onChangeBody = (e, id) => {
    onChange(e, id, 'body');
  };

  const onAdd = () => {
    setIsAdd(true);
  };

  const onCancel = () => {
    setIsAdd(false);
  };

  const onDelete = (id) => {
    const post = posts.find((post) => post.id === id);
    dispatch(deletePosts(post));
  };

  const onSave = () => {
    // We cancel the addition of the post
    setIsAdd(false);
    setNewPost({ ...defaultNewPost });

    dispatch(postsUpdated(posts));

    if (newPost.title || newPost.body) {
      dispatch(postPosts(newPost));
    }
  };

  const onDragEnd = (result) => {
    if (!result?.destination) return;
    const items = [...posts];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPosts(items);
  };

  const content = (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="posts">
        {(provided) => (
          <section {...provided.droppableProps} ref={provided.innerRef}>
            {posts.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}>
                {(provided) => (
                  <article
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="excerpt">
                    <label>
                      Post Title:
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => onChangeTitle(e, item.id)}
                      />
                    </label>
                    <label>
                      Content:
                      <textarea
                        value={item.body}
                        onChange={(e) => onChangeBody(e, item.id)}
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

  const newItemSection = isAdd && (
    <div className="fill-new-post">
      <hr />
      <article className="excerpt">
        <label>
          Post Title:
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => {
              setNewPost({ ...newPost, title: e.target.value });
            }}
          />
        </label>
        <label>
          Content:
          <textarea
            value={newPost.body}
            onChange={(e) => {
              setNewPost({ ...newPost, body: e.target.value });
            }}
          />
        </label>
      </article>
    </div>
  );

  const buttons = (
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
  );

  return (
    <section className="section posts-list">
      <h2>PostsList</h2>
      {content}
      {newItemSection}
      {buttons}
    </section>
  );
};
export default PostsList;
