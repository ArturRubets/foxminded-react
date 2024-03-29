import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { postUsers } from '../features/users/usersSlice';
import { MyTextInput } from './FormComponents';

const UserForm = () => {
  const userStatus = useSelector((state) => state.users.status);
  const isDisabled = userStatus === 'loading';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCancel = () => {
    navigate(-1);
  };

  const onSubmit = async (values) => {
    await dispatch(postUsers(values));
    navigate(-1);
  };

  const buttons = (
    <div className="btn-container">
      <button
        type="button"
        className="btn btn-hipster"
        onClick={onCancel}
        disabled={isDisabled}>
        Cancel
      </button>
      <button type="submit" className="btn" disabled={isDisabled}>
        Create
      </button>
    </div>
  );

  return (
    <section className="section">
      <h2>New User</h2>
      <Formik
        initialValues={{
          name: '',
          username: '',
          avatarUrl: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          username: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          avatarUrl: Yup.string().matches(
            /https?:\/\/.*\.(?:png|jpg)/i,
            `It doesn't look like a picture link`
          ),
        })}
        onSubmit={onSubmit}>
        <Form className="excerpt">
          <MyTextInput label="Name" name="name" type="text" />
          <MyTextInput label="Username" name="username" type="text" />
          <MyTextInput label="Avatar URL" name="avatarUrl" type="text" />
          {buttons}
        </Form>
      </Formik>
    </section>
  );
};
export default UserForm;
