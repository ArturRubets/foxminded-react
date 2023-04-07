import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getUserAlbums,
  selectAlbumsByUserId,
} from '../features/users/usersSlice';
import Spinner from './Spinner';

const UserAlbums = () => {
  const { id } = useParams();
  const userId = parseInt(id);
  const dispatch = useDispatch();
  const albums = useSelector((state) => selectAlbumsByUserId(state, userId));
  const isLoading = useSelector((state) => state.users.status) === 'loading';

  useEffect(() => {
    if (!albums) {
      dispatch(getUserAlbums(userId));
    }
  }, [dispatch, albums, userId]);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (albums?.length) {
    content = (
      <ul className="album-list">
        {albums.map((album) => (
          <li className={'album-item'} key={album.id}>
            <span className="album-title">{album.title}</span>
          </li>
        ))}
      </ul>
    );
  } else {
    content = <p className="error-not-found">Not found</p>;
  }
  return <div className="tab-content">{content}</div>;
};

export default UserAlbums;
