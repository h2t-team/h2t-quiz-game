import React from 'react';
// import { Image } from 'react-bootstrap';
import styles from './Slide.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
import { CustomTooltip } from 'components/Common';
import { Link } from 'react-router-dom';

interface SlidePreviewItemProps {
  index: number;
  // eslint-disable-next-line no-unused-vars
  onRemoveSlide: (index: number) => void;
  active: boolean;
  presentationId: string;
}

const SlidePreviewItem: React.FC<SlidePreviewItemProps> = ({
  index,
  onRemoveSlide,
  active,
  presentationId,
}) => {
  return (
    <Link
      replace
      to={`/presentations/${presentationId}/${index}/edit`}
      className={`d-flex flex-column p-1 ${styles.slidePreviewItem}`}
    >
      <div className="d-flex justify-content-between align-items-center mb-1">
        <p className="m-0 fs-6">{index + 1}</p>
        <FaTrashAlt
          id={index.toString()}
          onClick={() => onRemoveSlide(index)}
        />
        <CustomTooltip text="Delete" id={index.toString()} place="right" />
      </div>
      <div
        className={`${styles.slidePreviewItemContainer} ${
          active && 'bg-primary text-light'
        }`}
      >
        {index + 1}
      </div>
    </Link>
  );
};

export default SlidePreviewItem;
