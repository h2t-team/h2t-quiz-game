import PlayerLayout from 'components/Layouts/PlayerLayout';
import React from 'react';
import styles from './Instructions.module.scss';
const Instructions = () => {
  return (
    <PlayerLayout>
      <div className={styles.instructionsPage}>
        <div className={styles.in}> You are in </div>
        <div className={styles.name}> See your nickname on screen? </div>
      </div>
    </PlayerLayout>
  );
};
export default Instructions;
