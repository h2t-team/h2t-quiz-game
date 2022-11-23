import React from 'react';
import { Spinner, SpinnerProps, Container } from 'react-bootstrap';

interface LoaderProps extends SpinnerProps {
  isFullPage?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isFullPage, ...props }) => {
  if (isFullPage) {
    <Container>
      <Spinner {...props} />
    </Container>;
  }

  return <Spinner {...props} />;
};

export default React.memo(Loader);
