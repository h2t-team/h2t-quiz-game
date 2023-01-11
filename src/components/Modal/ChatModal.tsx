import React from 'react';
import { Modal } from 'react-bootstrap';

interface ChatModalProps {
  isShowModal: boolean;
  closeModal: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isShowModal, closeModal }) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="slideshow-chat"
      centered
      show={isShowModal}
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="slideshow-chat-title">Chat</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );
};

export default ChatModal;
