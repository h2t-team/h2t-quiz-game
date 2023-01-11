import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SlideShowMenu } from 'components/Common';
import AddQuestionModal from 'components/Modal/AddQuestionModal';
import ChatModal from 'components/Modal/ChatModal';
import config from 'config';
import { useModal } from 'hooks';
import { Message, Question } from 'models/presentation.model';
import React, { ComponentType, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from 'store';
import { axiosWithToken } from 'utils';
import { v4 as uuidv4 } from 'uuid';

interface WithPlayerSlideShowProps {
  component: ComponentType;
}

const WithPlayerSlideShow: React.FC<WithPlayerSlideShowProps> = (props) => {
  const { component: Component } = props;
  const queryClient = useQueryClient();
  const chatModal = useModal();
  const addQuestionModal = useModal();
  const [isCheckedNoti, setIsCheckedNoti] = useState<boolean>(false);
  const { presentId } = useParams();
  const {
    globalState: { socket },
  } = useContext(StoreContext);
  const [messageList, setMessageList] = useState<Message[]>([]);

  const handleAddQuestion = (data: { question: string }) => {
    socket.emit('add question', {
      roomId: presentId,
      question: data.question,
    });
  };

  const userInfo = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await axiosWithToken.get('/user');
      return res.data;
    },
  });

  const { data } = useQuery({
    queryKey: ['slideshow-questions'],
    queryFn: async () => {
      const res = await axiosWithToken.get(
        `${config.apiUrl}/presentation/${presentId}/questions`
      );
      return res.data.questionList as Question[];
    },
  });

  useEffect(() => {
    socket.on('added question', () => {
      queryClient.invalidateQueries({
        queryKey: ['slideshow-questions'],
      });
    });

    socket.on('marked question answered', () => {
      queryClient.invalidateQueries({
        queryKey: ['slideshow-questions'],
      });
    });
  }, []);

  useEffect(() => {
    socket.on('receive message', ({ messageText, username }: { messageText: string, username: string }) => {
      if (!chatModal.isShowModal) {
        setIsCheckedNoti(true);
      }

      setMessageList(prev => 
        [...prev, { 
          text: messageText, 
          username, 
          id: uuidv4() 
        }]
      )
    });

    return () => {
      socket.off('receive message');
    };
  });

  const handleAddMessage = (messageText: string) => {
    if (!messageText) {
      return;
    }

    socket.emit('send message', {
      roomId: presentId,
      messageText,
      username: userInfo.data?.user?.fullname as string
    })
  }

  const openChatModal = () => {
    setIsCheckedNoti(false);
    chatModal.openModal();
  }

  return (
    <>
      <Component />
      <SlideShowMenu
        openChatModal={openChatModal}
        openQaModal={addQuestionModal.openModal}
        isCheckedNoti={isCheckedNoti}
      />
      <AddQuestionModal
        isShowModal={addQuestionModal.isShowModal}
        closeModal={addQuestionModal.closeModal}
        presentationId={presentId as string}
        handleAddQuestion={handleAddQuestion}
        questionList={data as Question[]}
      />
      <ChatModal
        isShowModal={chatModal.isShowModal}
        closeModal={chatModal.closeModal}
        messageList={messageList}
        handleAddMessage={handleAddMessage}
      />
    </>
  );
};

export default WithPlayerSlideShow;
