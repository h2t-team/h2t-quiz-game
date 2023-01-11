import { Message } from 'models/presentation.model';
import React from 'react';

interface MessageProps {
  message: Message;
}

const MessageItem: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="mt-3 d-flex flex-column">
      <span className="mb-2 d-block">{message.username}</span>
      <span className="px-3 py-2 bg-secondary rounded-5 text-break">{message.text}</span>
    </div>
  )
}

export default MessageItem;