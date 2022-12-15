import React from 'react';
import { Spinner, SpinnerProps, Stack } from 'react-bootstrap';

interface LoaderProps extends SpinnerProps {
  isFullPage?: boolean;
  width?: string;
}

const Loader: React.FC<LoaderProps> = ({ isFullPage, width, ...props }) => {
  const style = { width: width, height: width };

  if (isFullPage) {
    return (
      <Stack className="justify-content-center align-items-center text-center">
        <Spinner variant="black" {...props} style={style} />
      </Stack>
    );
  }

  return <Spinner {...props} style={style} />;
};

export default React.memo(Loader);
