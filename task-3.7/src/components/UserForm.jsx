import { Form, Formik, useField } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { postUsers } from '../features/users/usersSlice';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

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
          userName: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          userName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        })}
        onSubmit={onSubmit}>
        <Form className="excerpt">
          <MyTextInput label="Name" name="name" type="text" />
          <MyTextInput label="User name" name="userName" type="text" />
          {buttons}
        </Form>
      </Formik>
    </section>
  );
};
export default UserForm;
