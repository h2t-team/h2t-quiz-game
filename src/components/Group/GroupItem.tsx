import { GroupByUser } from 'models';
import React from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import CustomModal from 'components/Common/CustomModal/CustomModal';
import { useModal } from 'hooks';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import config from 'config';
import { axiosWithToken } from 'utils';
import axios, { AxiosResponse } from 'axios';

interface GroupItemProps {
  data: GroupByUser;
}

const GroupItem: React.FC<GroupItemProps> = ({ data }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const navigateToGroup = () => {
    navigate(`/groups/${data.group.id}`);
  };

  const deleteGroupModal = useModal();

  const deleteGroupMutation = useMutation({
    mutationFn: (deleteData: { isDelete: boolean }) =>
      axiosWithToken.put(`${config.apiUrl}/groups/setDeleteGroup`, {
        groupId: data.group.id,
        isDelete: deleteData.isDelete,
      }),
    onSuccess: (res: AxiosResponse) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ['groupList'] });
      deleteGroupModal.closeModal();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) || error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    },
  });

  const handleDeleteGroup = () => {
    deleteGroupMutation.mutate({ isDelete: true });
  };

  return (
    <>
      <Card border="primary">
        <Row className="no-gutters">
          <div className="col-sm-10">
            <Card.Body>
              <Card.Title className="fs-3">{data.group.name}</Card.Title>
              <Card.Text className="fs-6 fw-semibold">
                Owner: {data.group.ownerUser.fullname}
              </Card.Text>
              <Card.Text className="mb-3 fs-6">My role: {data.role}</Card.Text>
              <Button
                variant="primary"
                onClick={navigateToGroup}
                className="fs-6 fw-semibold"
              >
                Go to group
              </Button>
            </Card.Body>
          </div>
          <div className="col-sm-2">
            <Card.Body>
              <FaTrashAlt
                className="mr-auto"
                id={data.group.id.toString()}
                onClick={deleteGroupModal.openModal}
              />
            </Card.Body>
          </div>
        </Row>
      </Card>
      <CustomModal
        isShowModal={deleteGroupModal.isShowModal}
        closeModal={deleteGroupModal.closeModal}
        titleText={'Confirm delete group'}
        bodyText={`Are you sure you want to delete ${data.group.name}?`}
        cancelModal={deleteGroupModal.closeModal}
        isDisableConfirm={deleteGroupMutation.isLoading}
        confirmText={'Delete'}
        confirmClick={handleDeleteGroup}
        confirmVariant={'danger'}
      />
    </>
  );
};

export default GroupItem;
