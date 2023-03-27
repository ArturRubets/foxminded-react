import { useSelector } from 'react-redux';

const Home = () => {
  const postsData = useSelector((state) => state.posts.data);
  const todosData = useSelector((state) => state.todos.data);
  const usersData = useSelector((state) => state.users.data);

  return (
    <section>
      <article>
        <h2>PostList</h2>
        <ul>
          {postsData.map((post) => (
            <div key={post.id} className="home excerpt">
              <div className="name">Title</div>
              <div>{post.title}</div>
              <div className="name">Body</div>
              <div>{post.body}</div>
            </div>
          ))}
        </ul>
      </article>
      <article>
        <h2>TodosList</h2>
        <ul>
          {todosData.map((post) => (
            <div key={post.id} className="home excerpt">
              <div className="name">Title</div>
              <div>{post.title}</div>
              <div className="name">Completed</div>
              <div>{post.completed}</div>
            </div>
          ))}
        </ul>
      </article>
      <article>
        <h2>UsersList</h2>
        <ul>
          {usersData.map((post) => (
            <div key={post.id} className="home excerpt">
              <div className="name">Name</div>
              <div>{post.name}</div>
              <div className="name">Username</div>
              <div>{post.username}</div>
            </div>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default Home;
