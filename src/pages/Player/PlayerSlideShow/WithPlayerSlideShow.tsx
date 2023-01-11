import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SlideShowMenu } from 'components/Common';
import AddQuestionModal from 'components/Modal/AddQuestionModal';
import ChatModal from 'components/Modal/ChatModal';
import config from 'config';
import { useModal } from 'hooks';
import { Question } from 'models/presentation.model';
import React, { ComponentType, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from 'store';
import { axiosWithToken } from 'utils';

interface WithPlayerSlideShowProps {
  component: ComponentType;
}

const WithPlayerSlideShow: React.FC<WithPlayerSlideShowProps> = (props) => {
  const { component: Component } = props;
  const queryClient = useQueryClient();
  const chatModal = useModal();
  const addQuestionModal = useModal();
  const { presentId } = useParams();
  const {
    globalState: { socket },
  } = useContext(StoreContext);

  const handleAddQuestion = (data: { question: string }) => {
    socket.emit('add question', {
      roomId: presentId,
      question: data.question,
    });
  };

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

  return (
    <>
      <Component />
      <SlideShowMenu
        openChatModal={chatModal.openModal}
        openQaModal={addQuestionModal.openModal}
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
      />
    </>
  );
};

export default WithPlayerSlideShow;
