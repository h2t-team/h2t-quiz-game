import React from 'react';
import { Stack } from 'react-bootstrap';
import SlidePreviewItem from './SlidePreviewItem';

interface SlidePreviewListProps {
  previewList: any[];
  // eslint-disable-next-line no-unused-vars
  onRemoveSlide: (index: number) => void;
  currentSlide: number;
}

const SlidePreviewList: React.FC<SlidePreviewListProps> = ({
  previewList,
  onRemoveSlide,
  currentSlide,
}) => {
  return (
    <Stack direction="vertical" className="overflow-auto">
      {previewList.map((previewItem) => (
        <SlidePreviewItem
          key={previewItem.id}
          index={previewItem.index}
          onRemoveSlide={onRemoveSlide}
          active={previewItem.index === currentSlide}
          presentationId={previewItem.presentId}
        />
      ))}
    </Stack>
  );
};

export default SlidePreviewList;
