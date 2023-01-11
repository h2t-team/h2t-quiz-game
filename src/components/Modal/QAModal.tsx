import { useQuery } from '@tanstack/react-query';
import { Loader } from 'components/Common';
import QuestionList from 'components/Question/QuestionList';
import config from 'config';
import { Question } from 'models/presentation.model';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { axiosWithToken } from 'utils';

interface QAModalProps {
  presentationId: string;
  isShowModal: boolean;
  closeModal: () => void;
  // eslint-disable-next-line no-unused-vars
  markQuestionAnswered?: (questionId: string) => void;
}

const QAModal: React.FC<QAModalProps> = ({
  isShowModal,
  closeModal,
  presentationId,
  markQuestionAnswered,
}) => {
  const { isLoading, data } = useQuery({
    queryKey: ['slideshow-questions'],
    queryFn: async () => {
      const res = await axiosWithToken.get(
        `${config.apiUrl}/presentation/${presentationId}/questions`
      );
      return res.data;
    },
  });

  return (
    <Modal
      size="lg"
      aria-labelledby="slideshow-q&a"
      centered
      show={isShowModal}
      onHide={closeModal}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="slideshow-q&a-title">
          Questions from Audience
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <Loader />
        ) : (
          <QuestionList
            questionList={data.questionList as Question[]}
            markQuestionAnswered={markQuestionAnswered}
            role="Host"
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default QAModal;
