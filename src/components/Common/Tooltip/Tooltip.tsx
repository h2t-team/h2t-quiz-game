import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface TooltipProps {
  id: string;
  text: string;
  place?: 'top' | 'bottom' | 'left' | 'right';
}

const CustomTooltip: React.FC<TooltipProps> = ({ text, id, place = 'top' }) => {
  return <Tooltip anchorId={id} place={place} content={text} />;
};

export default CustomTooltip;
