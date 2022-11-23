import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './AuthLayout.module.scss';
import { isLogin } from '../../../utils';

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
          <div className={styles.formOAuth}>
            <div className={styles.google}>
              <Button variant="outline-primary w-100 rounded-0">
                Continue with Google
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AuthLayout;
