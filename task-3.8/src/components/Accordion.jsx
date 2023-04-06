import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';

const Accordion = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="accordion">
      <div
        className={`accordion-header ${isExpanded ? 'expanded' : ''}`}
        onClick={handleToggle}>
        <h2>{title}</h2>
        <FontAwesomeIcon icon={isExpanded ? faMinus : faPlus} />
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: `${isExpanded ? contentRef.current?.scrollHeight : 0}px`,
        }}
        className={`accordion-content ${isExpanded ? 'expanded' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
