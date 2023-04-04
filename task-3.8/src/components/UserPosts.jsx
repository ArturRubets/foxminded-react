import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getUserPosts,
  selectPostsByUserId,
} from '../features/users/usersSlice';
import Spinner from './Spinner';

const UserPosts = () => {
  const { id } = useParams();
  const userId = parseInt(id);
  const dispatch = useDispatch();
  const posts = useSelector((state) => selectPostsByUserId(state, userId));
  const isLoading = useSelector((state) => state.users.status) === 'loading';

  useEffect(() => {
    if (!posts) {
      dispatch(getUserPosts(userId));
    }
  }, [dispatch, posts, userId]);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (posts?.length) {
    content = (
      <div>
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
          </div>
        ))}
      </div>
    );
  } else {
    content = <p className="error-not-found">Not found</p>;
  }
  return <div className="tab-content">{content}</div>;
};

export default UserPosts;
