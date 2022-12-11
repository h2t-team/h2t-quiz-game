import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import PlayerHeader from '../PlayerHeader';
import styles from './PlayerLayout.module.scss';

interface PlayerLayoutProps {
  children: React.ReactNode;
}

const PlayerLayout: React.FC<PlayerLayoutProps> = ({ children }) => {
  return (
    <Stack direction="vertical" >
      <PlayerHeader pin='123' nickname='abc' questionNumber={5} totalNumberOfQuestions={10}/>
      <Container fluid className={styles.container}>
        {children}
      </Container>
    </Stack>
  );
};

export default PlayerLayout;
