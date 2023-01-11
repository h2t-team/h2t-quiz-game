import { Question } from 'models/presentation.model';
import React from 'react';
import QuestionItem from './QuestionItem';

interface QuestionListProps {
  questionList: Question[];
  // eslint-disable-next-line no-unused-vars
  markQuestionAnswered?: (questionId: string) => void;
  role?: 'Host' | 'Player';
}

const QuestionList: React.FC<QuestionListProps> = ({
  questionList,
  markQuestionAnswered,
  role = 'Player',
}) => {
  return (
    <>
      {questionList &&
        questionList.map((questionItem: Question) => (
          <QuestionItem
            key={questionItem.id}
            value={questionItem}
            markQuestionAnswered={markQuestionAnswered}
            role={role}
          />
        ))}
    </>
  );
};

export default QuestionList;
