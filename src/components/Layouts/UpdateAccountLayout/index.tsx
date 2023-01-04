import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './UpdateAccountLayout.module.scss';
import { Link } from 'react-router-dom';

interface UpdateAccountLayoutProps {
  children?: React.ReactNode;
}

const UpdateAccountLayout: React.FC<UpdateAccountLayoutProps> = ({
  children,
}) => {
  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.formContainer}>
          {children}
          <div className={styles.formDivider}>OR</div>
          <div className={styles.center}>
            <Link to="/" className="btn btn-primary w-50">
              BACK TO LOG IN
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UpdateAccountLayout;
