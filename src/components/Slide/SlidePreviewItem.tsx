import React from 'react';
import { Image } from 'react-bootstrap';
import styles from './Slide.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
import { CustomTooltip } from 'components/Common';

function SlidePreviewItem() {
  return (
    <div className={`d-flex flex-column p-1 ${styles.slidePreviewItem}`}>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <p className="m-0 fs-6">1</p>
        <CustomTooltip text="Delete">
          <FaTrashAlt />
        </CustomTooltip>
      </div>
      <div className={styles.slidePreviewItemContainer}>
        <Image src="https://i.picsum.photos/id/408/200/300.jpg?hmac=WHLCqIpd4lzmPZlRRMknXp1aOoOr7_qdtEUwozDmIWQ" />
      </div>
    </div>
  );
}

export default SlidePreviewItem;
