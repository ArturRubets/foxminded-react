import { useState } from 'react';

const Image = ({ src, alt, altElement, ...props }) => {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  if (!src || hasError) {
    return altElement();
  }
  return <img {...props} onError={handleImageError} src={src} alt={alt} />;
};
export default Image;
