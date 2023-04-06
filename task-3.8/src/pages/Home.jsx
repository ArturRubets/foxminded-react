import { useSelector } from 'react-redux';
import Accordion from '../components/Accordion';
import Image from '../components/Image';

const Home = () => {
  const postsData = useSelector((state) => state.posts.data);
  const todosData = useSelector((state) => state.todos.data);
  const usersData = useSelector((state) => state.users.data);

  return (
    <section className="section">
      <Accordion title="PostList">
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
      </Accordion>
      <Accordion title="TodosList">
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
      </Accordion>
      <Accordion title="UsersList">
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
      </Accordion>
    </section>
  );
};

export default Home;
