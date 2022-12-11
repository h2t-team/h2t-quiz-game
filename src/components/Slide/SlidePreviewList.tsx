import React from 'react';
import { Stack } from 'react-bootstrap';
import SlidePreviewItem from './SlidePreviewItem';

function SlidePreviewList() {
  return (
    <Stack direction="vertical" className="overflow-auto">
      <SlidePreviewItem />
      <SlidePreviewItem />
      <SlidePreviewItem />
      <SlidePreviewItem />
      <SlidePreviewItem />
      <SlidePreviewItem />
      <SlidePreviewItem />
      <SlidePreviewItem />  
    </Stack>
  )
}

export default SlidePreviewList;