import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { postUsers } from '../features/users/usersSlice';
import { Form, Formik, useField } from 'formik';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCancel = () => {
    navigate(-1);
  };

  const onSubmit = (values) => {
    dispatch(postUsers(values));
    navigate(-1);
  };

  const buttons = (
    <div className="btn-container">
      <button type="button" className="btn btn-hipster" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit" className="btn">
        Create
      </button>
    </div>
  );

  return (
    <>
      <h2>New User</h2>
      <Formik
        initialValues={{
          name: '',
          username: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          username: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        })}
        onSubmit={onSubmit}>
        <Form className="excerpt">
          <MyTextInput label="Name" name="name" type="text" />
          <MyTextInput label="User name" name="username" type="text" />
          {buttons}
        </Form>
      </Formik>
    </>
  );
};
export default UserForm;
