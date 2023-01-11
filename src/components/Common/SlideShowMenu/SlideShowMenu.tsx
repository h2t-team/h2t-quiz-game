import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import {
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineChatBubbleLeftRight,
} from 'react-icons/hi2';
import CustomTooltip from '../Tooltip/Tooltip';

interface SlideShowMenuProps {
  openChatModal: () => void;
  openQaModal: () => void;
}

const SlideShowMenu: React.FC<SlideShowMenuProps> = ({
  openChatModal,
  openQaModal,
}) => {
  return (
    <ButtonGroup className="position-fixed bottom-0 end-0 m-3">
      <Button id="slideshow-chat-icon" onClick={openChatModal}>
        <HiOutlineChatBubbleLeftEllipsis />
      </Button>
      <CustomTooltip id="slideshow-chat-icon" text="Chat" />
      <CustomTooltip id="slideshow-q&a-icon" text="Q&A" />
      <Button id="slideshow-q&a-icon" onClick={openQaModal}>
        <HiOutlineChatBubbleLeftRight />
      </Button>
    </ButtonGroup>
  );
};

export default SlideShowMenu;
