import { Form, Formik, useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

const MyDatePicker = ({ label, minDate, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        minDate={minDate}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const PostForm = ({ onCancel, onSave }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <>
      <h2>New Post</h2>
      <Formik
        initialValues={{
          title: '',
          body: '',
          imageUrl: '',
          date: today,
          tags: '',
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(100, 'Must be 100 characters or less')
            .required('Required'),
          body: Yup.string()
            .max(2000, 'Must be 2000 characters or less')
            .required('Required'),
          imageUrl: Yup.string().required('Required'),
          date: Yup.date()
            .min(today, 'Date must be equal to or later than today')
            .required('Required'),
          tags: Yup.string().matches(
            /^#(\w+\b)(,\s*#(\w+\b))*$/,
            'Each tag should start with #'
          ),
        })}
        onSubmit={(values) => {
          if (values.tags) {
            const arrayTags = values.tags.split(/[ ,]+/);
            values.tags = arrayTags;
          } else {
            values.tags = [];
          }
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
          <MyDatePicker
            label="Date Published"
            name="date"
            id="date"
            type="date"
            minDate={today}
          />
          <MyTextInput
            label="Tags"
            name="tags"
            id="tags"
            type="text"
            placeholder="#spring, #flower, #sun"
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
