import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import MyTextInput from '../components/PostForm';
import {
  deletePosts,
  postPosts,
  postsUpdated,
} from '../features/posts/postsSlice';
import { StrictModeDroppable as Droppable } from '../helpers/StrictModeDroppable';

const PostsList = () => {
  const [isAdd, setIsAdd] = useState(false);
  const postsData = useSelector((state) => state.posts.data);
  const [posts, setPosts] = useState(postsData);
  const [isDragEnd, setIsDragEnd] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setPosts(postsData);
  }, [postsData]);

  useEffect(() => {
    if (isDragEnd) {
      dispatch(postsUpdated(posts));
      setIsDragEnd(false);
    }
  }, [dispatch, posts, isDragEnd]);

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

  const updatePosts = () => {
    dispatch(postsUpdated(posts));
  };

  const createPost = (newPost) => {
    // We cancel the addition of the post
    setIsAdd(false);

    if (newPost) {
      dispatch(postPosts(newPost));
    }
  };

  const onDragEnd = (result) => {
    if (!result?.destination) return;
    setIsDragEnd(true);
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

  const buttons = !isAdd && (
    <div className="btn-container">
      <button className="btn" onClick={onAdd}>
        Add new
      </button>
      <button className="btn" onClick={updatePosts}>
        Save
      </button>
    </div>
  );

  const postForm = isAdd && (
    <MyTextInput onCancel={onCancel} onSave={createPost} />
  );

  return (
    <section className="section posts-list">
      <h2>PostsList</h2>
      {content}
      {buttons}
      {postForm}
    </section>
  );
};
export default PostsList;
