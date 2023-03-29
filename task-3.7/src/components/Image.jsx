import { useState } from 'react';

const Image = ({ alt, ...props }) => {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <>{!hasError && <img {...props} onError={handleImageError} alt={alt} />}</>
  );
};
export default Image;
