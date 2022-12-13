import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import Footer from '../Footer';
import Header from '../Header';
import styles from './AppLayout.module.scss';
import { useRoute } from 'hooks';

interface AppLayoutProps {
  children: React.ReactNode;
  fluid?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ fluid = false, children }) => {
  const { isEditPresentation } = useRoute();
  const showFooter = !isEditPresentation();

  return (
    <Stack direction="vertical" className={styles.container}>
      <Header />
      <Container
        className={`d-flex flex-column ${fluid && 'g-0'}`}
        fluid={fluid}
      >
        {children}
      </Container>
      {showFooter && <Footer />}
    </Stack>
  );
};

export default AppLayout;
