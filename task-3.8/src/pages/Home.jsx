import { useSelector } from 'react-redux';
import Image from '../components/Image';

const Home = () => {
  const postsData = useSelector((state) => state.posts.data);
  const todosData = useSelector((state) => state.todos.data);
  const usersData = useSelector((state) => state.users.data);

  return (
    <section className="section">
      <article>
        <h2>PostList</h2>
        <ul>
          {postsData.map((post) => {
            const formattedDate =
              post.date && new Date(post.date).toLocaleDateString();
            return (
              <div key={post.id} className="home excerpt">
                <div className="name">Title</div>
                <div>{post.title}</div>
                <div className="name">Body</div>
                <div>{post.body}</div>
                {post.imageUrl && (
                  <Image className="post-img" src={post.imageUrl} alt="Post" />
                )}
                {post.tags?.length > 0 && (
                  <div className="post-tags-container">
                    {post.tags.map((tag) => (
                      <div className="post-tag">{tag}</div>
                    ))}
                  </div>
                )}
                {post.date && <div className="post-date">{formattedDate}</div>}
              </div>
            );
          })}
        </ul>
      </article>
      <article>
        <h2>TodosList</h2>
        <ul>
          {todosData.map((post) => {
            const status = post.completed ? 'Completed' : 'Not yet';
            return (
              <div key={post.id} className="home excerpt">
                <div className="name">Title</div>
                <div>{post.title}</div>
                <div className="name">Status</div>
                <div>{status}</div>
              </div>
            );
          })}
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
