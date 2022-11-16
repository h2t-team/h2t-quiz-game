import React from 'react';
import { 
  Spinner, 
  SpinnerProps,
  Container 
} 
  from 'react-bootstrap';

interface LoaderProps {
    children?: React.ReactNode;
    isFullPage?: boolean;
    size?: SpinnerProps['size'];
}

const Loader: React.FC<LoaderProps> = ({ isFullPage, size }) => {
  if (isFullPage) {
    <Container>
      <Spinner />
    </Container>
  }

  return <Spinner size={size} />;
};

export default React.memo(Loader);