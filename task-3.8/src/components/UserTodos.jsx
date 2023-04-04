import { useParams } from 'react-router-dom';

const UserTodos = () => {
  const { id } = useParams();
  return <section className="section">{id}</section>;
};
export default UserTodos;
