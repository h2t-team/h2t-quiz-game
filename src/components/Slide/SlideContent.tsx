import { Slide } from 'models/presentation.model';
import React from 'react';
import { Container } from 'react-bootstrap';

interface SlideContentProps {
  currentSlide?: Slide;
}

const SlideContent: React.FC<SlideContentProps> = ({ currentSlide }) => {
  return (
    <Container className="py-4">
      <h1>{currentSlide?.title}</h1>
    </Container>
  );
};

export default SlideContent;
