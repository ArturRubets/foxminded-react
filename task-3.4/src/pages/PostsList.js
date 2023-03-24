import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsUpdated } from '../features/posts/postsSlice';
import List from '../components/List';

const PostsList = () => {
  const dispatch = useDispatch();

  const postsData = useSelector((state) => state.posts.data);
  const [posts, setPosts] = useState(postsData);

  useEffect(() => {
    setPosts(postsData);
  }, [postsData]);

  const onPostChange = (e, index) => {
    const newPosts = [...posts];
    newPosts[index] = e.target.value;
    setPosts(newPosts);
  };

  const onAdd = () => {
    setPosts([...posts, '']);
  };

  const onSave = () => {
    const notEmpty = posts.filter((post) => post !== '');
    dispatch(postsUpdated(notEmpty));
  };

  return (
    <List
      title={'PostsList'}
      data={posts}
      onAdd={onAdd}
      onChange={onPostChange}
      onSave={onSave}
    />
  );
};
export default PostsList;
