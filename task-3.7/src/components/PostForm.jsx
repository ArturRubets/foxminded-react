import { Form, Formik } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import { MyDatePicker, MyTextArea, MyTextInput } from './FormComponents';

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
          imageUrl: Yup.string()
            .required('Required')
            .matches(
              /https?:\/\/.*\.(?:png|jpg)/i,
              `It doesn't look like a picture link`
            ),
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
