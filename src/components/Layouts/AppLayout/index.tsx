import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
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
    <div className={styles.container}>
      <Header />
      <Container className="py-5">{children}</Container>
      <Footer />
    </div>
  );
};

export default AppLayout;
