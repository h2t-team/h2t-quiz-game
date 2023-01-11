import React, { useContext, useEffect } from 'react';
import { Container, Stack } from 'react-bootstrap';
import Footer from '../Footer';
import Header from '../Header';
import styles from './AppLayout.module.scss';
import { useRoute } from 'hooks';
import { useQuery } from '@tanstack/react-query';
import { GroupByUser } from 'models';
import { toast } from 'react-toastify';
import { StoreContext } from 'store';
import { axiosWithToken } from 'utils';

interface AppLayoutProps {
  children: React.ReactNode;
  fluid?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ fluid = false, children }) => {
  const { isEditPresentation } = useRoute();
  const showFooter = !isEditPresentation();
  const {
    globalState: { socket },
  } = useContext(StoreContext);

  const groupData = useQuery({
    queryKey: ['groupList'],
    queryFn: async (): Promise<GroupByUser[]> => {
      const res = await axiosWithToken.get('/groups');
      return res.data.groups;
    },
  });

  useEffect(() => {
    groupData.data?.forEach((item) => {
      socket.emit('join room', item.group.id);
    });

    socket.on('notify present', ({ inviteCode, presentName, groupName }) => {
      toast.info(
        <a href={`/join-game/?code=${inviteCode}`}>
          &quot;{presentName}&quot; is presentating in {groupName}
        </a>
      );
    });

    return () => {
      socket.off('notify present');
    };
  }, [groupData.data]);

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
