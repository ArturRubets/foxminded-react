import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postsUpdated, postAdd } from '../features/posts/postsSlice';

const PostsList = () => {
  const dispatch = useDispatch();

  const postsData = useSelector((state) => state.posts.data);
  const [posts, setPosts] = useState(postsData);

  const onPostChange = (e, index) => {
    const newPosts = [...posts];
    newPosts[index] = e.target.value;
    setPosts(newPosts);
  };

  return (
    <section className="section">
      <h2>PostsList</h2>
      {posts.map((post, index) => (
        <div>
          <input
            key={index}
            value={post}
            onChange={(e) => onPostChange(e, index)}
          />
        </div>
      ))}
      <div className='btn-container'>
        <button onClick={() => dispatch(postAdd(''))}>Add new</button>
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
