/* eslint-disable no-console */
import { PresentationInfo } from 'models/presentation.model';
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useModal } from 'hooks';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import config from 'config';
import { axiosWithToken } from 'utils';
import axios, { AxiosResponse } from 'axios';
import CustomModal from 'components/Common/CustomModal/CustomModal';

interface PresentationListProps {
  list: PresentationInfo[];
}

const PresentationList: React.FC<PresentationListProps> = ({ list }) => {
  const queryClient = useQueryClient();
  const initialState: PresentationInfo = {
    name: '',
    id: '',
    inviteCode: '',
    groupId: null,
    'group.name': null
  };
  const [modalData, setModalData] = useState<PresentationInfo>(initialState);
  const deletePresentationModal = useModal();
  const deletePresentationMutation = useMutation({
    mutationFn: (deleteData: { presentationId: string; isDelete: boolean }) =>
      axiosWithToken.put(
        `${config.apiUrl}/presentation/setDeletePresentation`,
        {
          presentationId: deleteData.presentationId,
          isDelete: deleteData.isDelete,
        }
      ),
    onSuccess: (res: AxiosResponse) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ['presentationList'] });
      deletePresentationModal.closeModal();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) || error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    },
  });

  const handleDeletePresentation = (presentation: PresentationInfo) => {
    deletePresentationMutation.mutate({
      presentationId: presentation.id,
      isDelete: true,
    });
  };

  const presentationList = list.map((presentation) => {
    return (
      <>
        <tr key={presentation.id}>
          <td>
            <Link to={`/presentations/${presentation.id}/edit`}>
              {presentation.name}
            </Link>
          </td>
          <td>{presentation['group.name'] || 'Public'}</td>
          <td>{presentation.inviteCode}</td>
          <td>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setModalData(presentation);
                deletePresentationModal.openModal();
              }}
            >
              Remove
            </Button>
          </td>
        </tr>
      </>
    );
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Group</th>
          <th>Pin Code</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{presentationList}</tbody>
      <CustomModal
        isShowModal={deletePresentationModal.isShowModal}
        closeModal={deletePresentationModal.closeModal}
        titleText={'Confirm delete presentation'}
        bodyText={`Are you sure you want to delete ${modalData.name}?`}
        cancelModal={deletePresentationModal.closeModal}
        isDisableConfirm={deletePresentationMutation.isLoading}
        confirmText={'Delete'}
        confirmClick={() => handleDeletePresentation(modalData)}
        confirmVariant={'danger'}
      />
    </Table>
  );
};

export default PresentationList;
