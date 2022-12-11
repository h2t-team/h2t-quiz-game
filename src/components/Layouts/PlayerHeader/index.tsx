import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './PlayerHeader.module.scss';

interface PlayerHeaderProps {
    pin?: string,
    nickname?: string,
    questionNumber?: number,
    totalNumberOfQuestions?: number
}
function PlayerHeader(props: PlayerHeaderProps) {
  return (
    <Container fluid className={styles.status}>
      <div className={styles.left}>
        <div>PIN: {props.pin}</div>
        <QuestionDisplay
          questionNumber={props.questionNumber}
          totalNumberOfQuestions={props.totalNumberOfQuestions}
        />
      </div>
      <div className={styles.textCenter}>Question {props.questionNumber}</div>
      <div className={styles.textRight}>{props.nickname}</div>
    </Container>
  );
}

const QuestionDisplay = (props: PlayerHeaderProps) => {
  let component;
  if (props.questionNumber === undefined) {
    return null;
  } else {
    component = (
      <div className={styles.textLeft}>
        {props.questionNumber} of {props.totalNumberOfQuestions}
      </div>
    );
  }

  return <>{component}</>;
};

export default PlayerHeader;
