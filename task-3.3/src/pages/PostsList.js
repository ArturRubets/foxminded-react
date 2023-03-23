import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsUpdated } from '../features/posts/postsSlice';

const PostsList = () => {
  const dispatch = useDispatch();

  const postsData = useSelector((state) => state.posts.data);
  const [posts, setPosts] = useState(postsData);

  const onPostChange = (e, index) => {
    const newPosts = [...posts];
    newPosts[index] = e.target.value;
    setPosts(newPosts);
  };

  useEffect(() => {
    setPosts(postsData);
  }, [postsData]);

  return (
    <section className="section">
      <h2>PostsList</h2>
      {posts.map((post, index) => (
        <div key={index}>
          <input value={post} onChange={(e) => onPostChange(e, index)} />
        </div>
      ))}
      <div className="btn-container">
        <button
          onClick={() => {
            setPosts([...posts, '']);
          }}>
          Add new
        </button>
        <button
          onClick={() => {
            const notEmpty = posts.filter((post) => post !== '');
            dispatch(postsUpdated(notEmpty));
          }}>
          Save
        </button>
      </div>
    </section>
  );
};
export default PostsList;
