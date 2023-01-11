import React from 'react';
import { ButtonGroup, Button, Badge } from 'react-bootstrap';
import {
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineChatBubbleLeftRight,
} from 'react-icons/hi2';
import CustomTooltip from '../Tooltip/Tooltip';

interface SlideShowMenuProps {
  openChatModal: () => void;
  openQaModal: () => void;
  isCheckedNoti: boolean;
}

const SlideShowMenu: React.FC<SlideShowMenuProps> = ({
  openChatModal,
  openQaModal,
  isCheckedNoti = false,
}) => {
  return (
    <ButtonGroup className="position-fixed bottom-0 end-0 m-3">
      <Button id="slideshow-chat-icon" onClick={openChatModal} className="position-relative">
        <HiOutlineChatBubbleLeftEllipsis />
        {
          isCheckedNoti && <Badge pill bg="danger" className="position-absolute end-50 top-0">New</Badge>
        }
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
