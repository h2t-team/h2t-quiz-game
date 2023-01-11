import { CustomTooltip } from 'components/Common';
import { Question } from 'models/presentation.model';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { BiCheck, BiLike } from 'react-icons/bi';

interface QuestionProps {
  value: Question;
  // eslint-disable-next-line no-unused-vars
  markQuestionAnswered?: (questionId: string) => void;
  role?: 'Host' | 'Player';
}

const QuestionItem: React.FC<QuestionProps> = ({
  value,
  markQuestionAnswered,
  role = 'Player',
}) => {
  const handleMarkAnswered = (questionId: string) => {
    markQuestionAnswered && markQuestionAnswered(questionId);
  };

  return (
    <Row
      className={`my-2 rounded align-items-center py-3 border-secondary border ${
        value.isAnswered && 'border-success border-1'
      }`}
    >
      <Col xs={7}>{value.question}</Col>
      <Col xs={2}>
        {role === 'Host' ? (
          `Votes: ${value.numOfVotes}`
        ) : (
          <div className="d-flex align-items-center">
            <span className="me-2">{value.numOfVotes}</span>
            <Button variant="outline-black" id={`${value.id}vote`}>
              <BiLike fontSize="1.25rem" />
            </Button>
            <CustomTooltip id={`${value.id}vote`} text="Like" place="right" />
          </div>
        )}
      </Col>
      <Col xs={3} className="d-flex justify-content-end">
        {value.isAnswered ? (
          <span className="text-success">Answered!</span>
        ) : !markQuestionAnswered ? (
          'Not Answered!'
        ) : (
          <>
            <Button
              className="rounded"
              variant="outline-success"
              id={`${value.id}mark`}
              disabled={value.isAnswered}
              onClick={() => handleMarkAnswered(value.id)}
            >
              <BiCheck fontSize="1.25rem" />
            </Button>
            <CustomTooltip
              id={`${value.id}mark`}
              text="Mark as answered"
              place="right"
            />
          </>
        )}
      </Col>
    </Row>
  );
};

export default QuestionItem;
