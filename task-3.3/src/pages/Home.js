import { useSelector } from 'react-redux';

const Home = () => {
  const { posts } = useSelector((state) => state.posts);

  return (
    <ul>
      {posts.map((post) => (
        <li>{post}</li>
      ))}
    </ul>
  );
};

export default Home;
