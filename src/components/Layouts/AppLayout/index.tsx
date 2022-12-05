import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Stack } from 'react-bootstrap';
import Footer from '../Footer';
import Header from '../Header';
import { isLogin } from 'utils';
import styles from './AppLayout.module.scss';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!isLogin()) {
      navigate('/login');
    }
  }, []);

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
