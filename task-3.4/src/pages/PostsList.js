import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoResizeTextarea from '../components/AutoResizeTextarea';
import { postsUpdated } from '../features/posts/postsSlice';

const PostsList = () => {
  const dispatch = useDispatch();

  const postsData = useSelector((state) => state.posts.data);
  const [posts, setPosts] = useState(postsData);

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
  };

  const onSave = () => {
    dispatch(postsUpdated(posts));
  };

  return (
    <section className="section">
      <h2>PostsList</h2>
      {posts.map((item, index) => (
        <>
          <article key={item.id}>
            <p>Title</p>
            <AutoResizeTextarea
              defaultValue={item.title}
              onChange={(e) => onChangeTitle(e, item.id)}
            />
            <p>Description</p>
            <AutoResizeTextarea
              defaultValue={item.body}
              onChange={(e) => onChangeBody(e, item.id)}
            />
          </article>
          {index < posts.length - 1 && <hr />}
        </>
      ))}
      <div className="btn-container">
        <button className="btn" onClick={onAdd}>
          Add new
        </button>
        <button className="btn" onClick={onSave}>
          Save
        </button>
      </div>
    </section>
  );
};
export default PostsList;
