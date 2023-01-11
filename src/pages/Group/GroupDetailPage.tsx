/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { AppLayout } from 'components/Layouts';
import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { axiosWithToken } from 'utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'components/Common';
import { Link, useParams } from 'react-router-dom';
import { Stack, Button, Form, ListGroup, Alert } from 'react-bootstrap';
import { useModal } from 'hooks';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { GroupDetail, UserPreviewWithRoleInGroup } from 'models';
import { Role } from 'enums';
import CustomModal from 'components/Common/CustomModal/CustomModal';
import { PresentationInfo } from 'models/presentation.model';

type NewUsersInGroupInputs = {
  email: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required('An email is required')
    .email('Must be a valid email'),
});

function GroupDetailPage() {
  const [selectedUser, setSelectedUser] =
    useState<UserPreviewWithRoleInGroup>();
  const queryClient = useQueryClient();
  const addUserModal = useModal();
  const kickUserModal = useModal();
  const deleteGroupModal = useModal();
  const { groupId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewUsersInGroupInputs>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    delayError: 300,
  });

  const handleAddUsersToGroup = async (data: NewUsersInGroupInputs) => {
    await addUserMutation.mutateAsync(data);
  };

  const handleCloseAddUserModal = () => {
    reset();
    addUserModal.closeModal();
  };

  const groupPresenting = useQuery({
    queryKey: ['groupPresenting'],
    queryFn: async () => {
      const res = await axiosWithToken.get(
        `${config.apiUrl}/presentation/group/${groupId}`
      );
      return res.data.presentation as PresentationInfo;
    },
  });

  const addUserMutation = useMutation({
    mutationFn: (data: NewUsersInGroupInputs) =>
      axiosWithToken.post(
        `${config.apiUrl}/groups/${groupId}/inviteUserByEmail`,
        {
          ...data,
        }
      ),
    onSuccess: (res: AxiosResponse) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ['groupDetail'] });
      handleCloseAddUserModal();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) || error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    },
  });

  const setUserRoleMutation = useMutation({
    mutationFn: (data: { role: Role }) =>
      axiosWithToken.put(`${config.apiUrl}/groups/${groupId}/setUserRole`, {
        memberId: selectedUser?.userId,
        role: data.role,
      }),
    onSuccess: (res: AxiosResponse) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ['groupDetail'] });
      kickUserModal.closeModal();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) || error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    },
  });

  const kickUserMutation = useMutation({
    mutationFn: (data: { role: Role }) =>
      axiosWithToken.put(`${config.apiUrl}/groups/${groupId}/setUserRole`, {
        memberId: selectedUser?.userId,
        role: data.role,
      }),
    onSuccess: (res: AxiosResponse) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ['groupDetail'] });
      kickUserModal.closeModal();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) || error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    },
  });

  const handleKickUserInGroup = () => {
    kickUserMutation.mutateAsync({ role: Role.KICK_OUT });
  };

  const deleteGroupMutation = useMutation({
    mutationFn: (data: { role: Role }) =>
      axiosWithToken.put(`${config.apiUrl}/groups/${groupId}/setUserRole`, {
        memberId: selectedUser?.userId,
        role: data.role,
      }),
    onSuccess: (res: AxiosResponse) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ['groupDetail'] });
      kickUserModal.closeModal();
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
    console.log('delete group');
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['groupDetail'],
    queryFn: async () => {
      const res = await axiosWithToken.get(
        `${config.apiUrl}/groups/${groupId}`
      );
      return res.data as GroupDetail;
    },
  });
  
  if (isLoading) {
    return (
      <AppLayout>
        <Loader isFullPage />;
      </AppLayout>
    );
  }

  if (isError || !data) {
    return null;
  }

  const addUserFormModalBody = (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Invite the user to add:</Form.Label>
        <Form.Control
          {...register('email')}
          placeholder="Example: abc123@gmail.com"
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
  return (
    <AppLayout>
      <div className="py-5">
        <h1 className="fw-bold fs-1">{data.group.name}</h1>
        <Alert
          variant="info"
          show={!!groupPresenting.data?.inviteCode}
          className="d-flex"
        >
          &quot;{groupPresenting.data?.name}&quot; is presenting
          <Link
            to={`/join-game/?code=${groupPresenting.data?.inviteCode}`}
            className="ms-auto"
          >
            Go to presentation
          </Link>
        </Alert>
        <Stack direction="horizontal" className="justify-content-end">
          <Button
            variant="info"
            onClick={addUserModal.openModal}
            className="mb-4 fw-semibold"
          >
            Add user
          </Button>
          {/* Check current user role = owner ? */}
          <Button
            variant="danger"
            onClick={deleteGroupModal.openModal}
            className="mb-4 ms-2 fw-semibold"
          >
            Delete group
          </Button>
        </Stack>
        <div className="mb-5">
          <h2 className="fs-3">Owner</h2>
          <hr className="border-black"></hr>
          <p className="fs-6">{data.group.ownerUser.fullname}</p>
        </div>
        <div className="mb-5">
          <h2 className="fs-3">Co-owners and Members</h2>
          <hr className="border-black"></hr>
          <ListGroup>
            {data.group.userInGroups.map(
              (userInfo: UserPreviewWithRoleInGroup) =>
                userInfo.role !== 'owner' && (
                  <ListGroup.Item
                    onClick={() => setSelectedUser(userInfo)}
                    key={userInfo.userId}
                    className="bg-secondary d-flex justify-content-between align-items-center border-0 border-bottom border-primary rounded-0 py-3"
                  >
                    <p className="fs-6 fw-semibold">{userInfo.user.fullname}</p>
                    {/* TODO: Check the current user is the owner */}
                    <div className="d-flex">
                      <Form.Group className="d-flex align-items-center">
                        <Form.Label className="mb-0">Role:</Form.Label>
                        <Form.Select
                          size="sm"
                          value={userInfo.role}
                          aria-label="Group role select"
                          id={userInfo.userId}
                          className="ms-2"
                          // Implement update role
                        >
                          <option value={Role.CO_OWNER}>Co-owner</option>
                          <option value={Role.MEMBER}>Member</option>
                        </Form.Select>
                      </Form.Group>
                      <Button
                        variant="danger"
                        size="sm"
                        className="ms-3"
                        onClick={() => kickUserModal.openModal()}
                      >
                        Kick
                      </Button>
                    </div>
                  </ListGroup.Item>
                )
            )}
          </ListGroup>
        </div>
        {/* TODO: Extract Modal to Common */}
        {/* KICK USER */}
        <CustomModal
          isShowModal={kickUserModal.isShowModal}
          closeModal={kickUserModal.closeModal}
          titleText={'Confirm kick the user'}
          bodyText={`Are you sure you want to kick  ${selectedUser?.user.fullname}?`}
          cancelModal={kickUserModal.closeModal}
          isDisableConfirm={kickUserMutation.isLoading}
          confirmText={'Kick'}
          confirmClick={handleKickUserInGroup}
        />
        {/* ADD USER */}
        <CustomModal
          isShowModal={addUserModal.isShowModal}
          closeModal={handleCloseAddUserModal}
          titleText={'Add a user'}
          submitForm={handleSubmit(handleAddUsersToGroup)}
          modalBody={addUserFormModalBody}
          cancelModal={handleCloseAddUserModal}
          isDisableConfirm={addUserMutation.isLoading}
          confirmText={'Add'}
        />
        {/* DELETE GROUP */}
        <CustomModal
          isShowModal={deleteGroupModal.isShowModal}
          closeModal={deleteGroupModal.closeModal}
          titleText={'Confirm delete group'}
          bodyText={`Are you sure you want to delete  ${data.group.name}?`}
          cancelModal={deleteGroupModal.closeModal}
          isDisableConfirm={deleteGroupMutation.isLoading}
          confirmText={'Delete'}
          confirmClick={handleDeleteGroup}
        />
      </div>
    </AppLayout>
  );
}

export default GroupDetailPage;
