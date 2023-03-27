import { useSelector } from 'react-redux';

const Home = () => {
  const postsData = useSelector((state) => state.posts.data);
  const todosData = useSelector((state) => state.todos.data);
  const usersData = useSelector((state) => state.users.data);

  return (
    <section>
      <article>
        <p>PostList</p>
        <ul>
          {postsData.map((post) => (
            <div key={post.id} className="data">
              <div className="name">Title</div>
              <div>{post.title}</div>
              <div className="name">Body</div>
              <div>{post.body}</div>
            </div>
          ))}
        </ul>
      </article>
      <article>
        <p>TodosList</p>
        <ul>
          {todosData.map((post) => (
            <div key={post.id} className="data">
              <div className="name">Title</div>
              <div>{post.title}</div>
              <div className="name">Completed</div>
              <div>{post.completed}</div>
            </div>
          ))}
        </ul>
      </article>
      <article>
        <p>UsersList</p>
        <ul>
          {usersData.map((post) => (
            <div key={post.id} className="data">
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
