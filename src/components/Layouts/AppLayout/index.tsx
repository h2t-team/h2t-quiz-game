import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import Footer from '../Footer';
import Header from '../Header';
import styles from './AppLayout.module.scss';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Stack direction="vertical" className={styles.container}>
      <Header />
      <Container className="py-5 flex-grow-1 d-flex flex-column">
        {children}
      </Container>
      <Footer />
    </Stack>
  );
};

export default AppLayout;
