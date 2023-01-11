import { yupResolver } from '@hookform/resolvers/yup';
import QuestionList from 'components/Question/QuestionList';
import { Question } from 'models/presentation.model';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface AddQuestionModalProps {
  presentationId: string;
  isShowModal: boolean;
  closeModal: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAddQuestion: (data: NewQuestionInputs) => void;
  questionList: Question[];
}

type NewQuestionInputs = {
  question: string;
};

const schema = yup.object().shape({
  question: yup.string().required('Question is required'),
});

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isShowModal,
  closeModal,
  handleAddQuestion,
  questionList,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewQuestionInputs>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    delayError: 300,
  });

  return (
    <Modal
      size="lg"
      aria-labelledby="slideshow-questions"
      centered
      show={isShowModal}
      onHide={closeModal}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="slideshow-questions-title">
          Questions for Host
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <QuestionList questionList={questionList as Question[]} />
      </Modal.Body>
      <Modal.Footer className="d-block">
        <Form
          onSubmit={handleSubmit(handleAddQuestion)}
          className="d-flex justify-content-between"
        >
          <Form.Group className="mb-3 flex-grow-1 me-sm-3">
            <Form.Control
              {...register('question')}
              type="text"
              placeholder="Ask a question"
              isInvalid={!!errors.question}
            />
            <Form.Control.Feedback type="invalid">
              {errors.question?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-3">
            Send
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default AddQuestionModal;
