import React from 'react';
import { Spinner, SpinnerProps, Container } from 'react-bootstrap';

interface LoaderProps extends SpinnerProps {
  isFullPage?: boolean;
  width?: string;
}

const Loader: React.FC<LoaderProps> = ({ isFullPage, width, ...props }) => {
  const style = { width: width, height: width };
  if (isFullPage) {
    <Container>
      <Spinner {...props} style={style} />
    </Container>;
  }

  return <Spinner {...props} style={style} />;
};

export default React.memo(Loader);
