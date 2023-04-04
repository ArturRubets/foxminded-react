import { useState } from 'react';

const Image = ({ src, alt, ...props }) => {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  return !src || hasError ? null : (
    <img {...props} onError={handleImageError} src={src} alt={alt} />
  );
};
export default Image;
