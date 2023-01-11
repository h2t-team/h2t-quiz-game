import MessageList from 'components/Message/MessageList';
import { Message } from 'models/presentation.model';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface ChatModalProps {
  isShowModal: boolean;
  closeModal: () => void;
  messageList: Message[];
  // eslint-disable-next-line no-unused-vars
  handleAddMessage: (text: string) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isShowModal, closeModal, messageList, handleAddMessage }) => {
  const [message, setMessage] = useState<string>('');

  const handleSetMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setMessage(value);
  }

  const submitAddMessage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleAddMessage(message);
  }

  return (
    <Modal
      aria-labelledby="slideshow-chat"
      centered
      show={isShowModal}
      onHide={closeModal}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="slideshow-chat-title">Chat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MessageList messageList={messageList}/>
      </Modal.Body>
      <Modal.Footer className="d-block">
        <Form
          onSubmit={submitAddMessage}
          className="d-flex justify-content-between"
        >
          <Form.Group className="mb-3 flex-grow-1 me-sm-3">
            <Form.Control
              type="text"
              placeholder="Chat something"
              value={message}
              onChange={handleSetMessage}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-3">
            Send
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatModal;
