import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface TooltipProps {
  children: React.ReactElement;
  text: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const renderTooltip = () => <Tooltip>{text}</Tooltip>;

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      {children}
    </OverlayTrigger>
  );
};

export default CustomTooltip;
