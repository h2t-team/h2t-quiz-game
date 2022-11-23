import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import Header from '../Header';
import { isLogin } from '../../../utils';

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
    <div>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};

export default AppLayout;
