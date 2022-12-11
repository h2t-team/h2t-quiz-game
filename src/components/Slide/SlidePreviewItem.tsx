import React from 'react';
import { Image } from 'react-bootstrap';
import styles from './Slide.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
import { CustomTooltip } from 'components/Common';

function SlidePreviewItem() {
  return (
    <div className={`d-flex flex-column p-1 ${styles.slidePreviewItem}`}>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <p className='m-0 fs-6'>1</p>
        <CustomTooltip text="Delete">
          <FaTrashAlt />
        </CustomTooltip>
      </div>
      <div className={styles.slidePreviewItemContainer}>
        <Image src="https://pixabay.com/get/g6cbbf9aaebbad11c7ae213c4102c01f6cbe761b8c53a516dbd64b741df3fac38e237d470993b78bb7b5a779961b88259_1280.jpg" />
      </div>
    </div>
  )
}

export default SlidePreviewItem;