import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

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

const PostForm = ({ onCancel, onSave }) => {
  return (
    <>
      <Formik
        initialValues={{
          title: '',
          body: '',
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(100, 'Must be 100 characters or less')
            .required('Required'),
          body: Yup.string()
            .max(2000, 'Must be 2000 characters or less')
            .required('Required'),
        })}
        onSubmit={(values) => {
          onSave(values);
        }}>
        <Form>
          <MyTextInput label="Title" name="title" id="title" type="text" />
          <MyTextInput label="Content" name="body" id="body" type="text" />
          <div className="btn-container">
            <button className="btn btn-hipster" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
export default PostForm;
