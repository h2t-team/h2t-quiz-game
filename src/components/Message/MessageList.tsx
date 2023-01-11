import { Message } from 'models/presentation.model';
import React from 'react';
import MessageItem from './MessageItem';

interface MessageListProps {
  messageList: Message[];
}

const MessageList: React.FC<MessageListProps> = ({
  messageList,
}) => {
  return (
    <>
      {messageList &&
        messageList.map((message: Message) => (
          <MessageItem
            key={message.id}
            message={message}
          />
        ))}
    </>
  );
};

export default MessageList;
