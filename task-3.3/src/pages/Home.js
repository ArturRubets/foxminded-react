import { useSelector } from 'react-redux';

const Home = () => {
  const postsData = useSelector((state) => state.posts.data);
  const usersData = useSelector((state) => state.users.data);
  const todosData = useSelector((state) => state.todos.data);

  return (
    <section>
      <article>
        <p>PostList</p>
        <ul>
          {postsData.map((post, index) => (
            <li key={index}>{post}</li>
          ))}
        </ul>
      </article>
      <article>
        <p>UserList</p>
        <ul>
          {usersData.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </article>
      <article>
        <p>TodoList</p>
        <ul>
          {todosData.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default Home;
