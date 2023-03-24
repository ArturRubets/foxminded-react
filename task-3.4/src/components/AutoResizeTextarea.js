import { useState, useRef, useEffect } from 'react';

const AutoResizeTextarea = ({ defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustHeight();
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        handleChange(e);
        onChange(e)
      }}
    />
  );
};

export default AutoResizeTextarea;
