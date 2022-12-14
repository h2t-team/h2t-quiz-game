import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginWithGoogleButton from 'components/Form/LoginWithGoogleButton';
import { isLogin } from 'utils';
import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isLogin()) {
      navigate('/');
    }
  }, []);

  return (
    <div className={styles.authPage}>
      <Container>
        <div className={styles.formContainer}>
          {children}
          <div className={styles.formDivider}>OR</div>
          <LoginWithGoogleButton />
        </div>
      </Container>
    </div>
  );
};

export default AuthLayout;
