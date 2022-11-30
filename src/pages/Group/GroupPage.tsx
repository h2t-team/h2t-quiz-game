import React, { useState } from 'react';
import { AppLayout } from 'components/Layouts';
import { GroupList } from 'components/Group';
import axios from 'axios';
import config from 'config';
import { getItem, isLogin } from 'utils';
import { useQuery } from '@tanstack/react-query';
import { Group } from 'models';
import { Button, Form, Modal, Stack } from 'react-bootstrap';
import { Loader } from 'components/Common';
import { useNavigate } from 'react-router-dom';

const GroupPage = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!isLogin()) {
      const redirectUrl = `/login?redirect=${location.pathname}`;
      navigate(redirectUrl);
    }
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['groupList'],
    queryFn: async () => {
      const res = await axios.get(`${config.apiUrl}/groups`, {
        headers: {
          authorization: `Bearer ${getItem('h2t_access_token')}`,
        },
      });
      return res.data;
    },
  });

  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  }

  const handleCreateNewGroup = () => {
    handleCloseModal();
  };

  if (isLoading) {
    return <Loader isFullPage />;
  }

  if (isError) {
    <AppLayout>
      Error
    </AppLayout>
  }

  return (
    <AppLayout>
      <h1 className="fw-bold">All groups</h1>
      <Stack direction="horizontal" className="justify-content-end">
        <Button variant="info" onClick={handleOpenModal} className="mb-4">
          New group
        </Button>
      </Stack>
      <GroupList list={data.groups as Group[]} />
      {/* TODO: Extract Modal to Common */}
      <Modal
        size="lg"
        aria-labelledby="create-group"
        centered
        show={isShowModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="create-group">
          Create new group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateNewGroup}>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Example: Group 1"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleCreateNewGroup}>Create</Button>
        </Modal.Footer>
      </Modal>
    </AppLayout>
  );
};

export default GroupPage;
