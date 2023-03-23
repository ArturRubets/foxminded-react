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
          {posts.map((post) => (
            <li>{post}</li>
          ))}
        </ul>
      </article>
      <article>
        <p>UserList</p>
        <ul>
          {users.map((user) => (
            <li>{user}</li>
          ))}
        </ul>
      </article>
      <article>
        <p>TodoList</p>
        <ul>
          {todos.map((todo) => (
            <li>{todo}</li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default Home;
