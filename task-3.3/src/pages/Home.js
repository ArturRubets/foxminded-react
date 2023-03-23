import { useSelector } from 'react-redux';

const Home = () => {
  const {
    posts: { posts },
    user: { users },
    todo: { todos },
  } = useSelector((state) => state);

  return (
    <section>
      <article>
        <p>PostList</p>
        <ul>
          {posts.map((post, index) => (
            <li key={index}>{post}</li>
          ))}
        </ul>
      </article>
      <article>
        <p>UserList</p>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </article>
      <article>
        <p>TodoList</p>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default Home;
