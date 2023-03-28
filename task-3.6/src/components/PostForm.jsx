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

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const PostForm = ({ onCancel, onSave }) => {
  return (
    <>
      <h2>New Post</h2>
      <Formik
        initialValues={{
          title: '',
          body: '',
          imageUrl: '',
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(100, 'Must be 100 characters or less')
            .required('Required'),
          body: Yup.string()
            .max(2000, 'Must be 2000 characters or less')
            .required('Required'),
          imageUrl: Yup.string().required('Required'),
        })}
        onSubmit={(values) => {
          onSave(values);
        }}>
        <Form className="excerpt">
          <MyTextInput label="Title" name="title" id="title" type="text" />
          <MyTextArea label="Content" name="body" id="body" type="text" />
          <MyTextInput
            label="Image URL"
            name="imageUrl"
            id="imageUrl"
            type="text"
          />
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
