import React, { useState } from 'react';
import { AppLayout } from 'components/Layouts';
import axios from 'axios';
import config from 'config';
import { getItem, isLogin } from 'utils';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'components/Common';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack, Button, Modal, Form } from 'react-bootstrap';

function GroupDetailPage() {
  const [isShowModal, setIsShowModal] = useState(false);
  const { groupId } = useParams();
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  }

  const handleAddUser = () => {
    handleCloseModal();
  }

  React.useEffect(() => {
    if (!isLogin()) {
      const redirectUrl = `/login?redirect=${location.pathname}`;
      navigate(redirectUrl);
    }
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['groupList'],
    queryFn: async () => {
      const res = await axios.get(`${config.apiUrl}/groups/${groupId}`, {
        headers: {
          authorization: `Bearer ${getItem('h2t_access_token')}`,
        },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader isFullPage />;
  }

  if (isError || !data) {
    return null;
  }

  return (
    <AppLayout>
      <h1 className="fw-bold">{data.group.name}</h1>
      <Stack direction="horizontal" className="justify-content-end">
        <Button variant="info" onClick={handleOpenModal} className="mb-4">
          Add user
        </Button>
      </Stack>
      <p>Owner: {data.group.ownerUser.fullname}</p>
      <p>Members: </p>
      {data.group.userInGroups.map((userInfo: { user: { fullname: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; }) => 
        <>
          <p>{userInfo.user.fullname}</p>
        </>
      )}
      {/* TODO: Extract Modal to Common */}
      <Modal
        size="lg"
        aria-labelledby="create-group"
        centered
        show={isShowModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-user-group">
          Add a user
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Invite the user to add:</Form.Label>
              <Form.Control type="email" placeholder="Example: abc123@gmail.com" required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleAddUser}>Add</Button>
        </Modal.Footer>
      </Modal>
    </AppLayout>
  );
}

export default GroupDetailPage;
