import React from 'react';
import { AppLayout } from 'components/Layouts';
import { Button, ButtonGroup, Form, Modal } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import PresentationList from 'components/Presentation/PresentationList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosWithToken } from 'utils';
import { Loader } from 'components/Common';
import { useModal } from 'hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import config from 'config';
import { toast } from 'react-toastify';
import { GroupByUser } from 'models';

type NewPresentationInputs = {
  presentationName: string;
  groupId?: string;
};

const schema = yup.object().shape({
  presentationName: yup
    .string()
    .required('Presentation name is required')
    .min(3, 'Presentation name must be at least 3 characters')
    .max(32, 'Presentation name must not exceed 32 characters'),
  groupId: yup.string(),
});

function PresentationPage() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewPresentationInputs>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    delayError: 300,
  });
  const { isShowModal, closeModal, openModal } = useModal();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['presentationList'],
    queryFn: async () => {
      const res = await axiosWithToken.get('/presentation');
      return res.data;
    },
  });

  const groupList = useQuery({
    queryKey: ['groupList'],
    queryFn: async (): Promise<GroupByUser[]> => {
      const res = await axiosWithToken.get(`${config.apiUrl}/groups`);
      return res.data.groups;
    },
  });

  const mutation = useMutation({
    mutationFn: (data: NewPresentationInputs) => {
      const postBody: { name: string; groupId?: string } = {
        name: data.presentationName,
      };

      if (data.groupId) {
        postBody.groupId = data.groupId;
      }

      return axiosWithToken.post('/presentation', postBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presentationList'] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) || error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    },
  });

  const handleCreateNewPresentation = (data: NewPresentationInputs) => {
    mutation.mutate(data);
    reset();
    closeModal();
  };

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

  return (
    <AppLayout>
      <div className="py-5">
        <h1 className="mb-4">My presentations</h1>
        <div className=" d-flex justify-content-between">
          <ButtonGroup className="mb-4">
            <Button
              variant="info"
              className="d-flex align-items-center"
              onClick={openModal}
            >
              <AiOutlinePlus />
              <span className="ms-1">New presentation</span>
            </Button>
          </ButtonGroup>
          <Form className="mb-4">
            <Form.Control type="search" placeholder="Type to search" />
          </Form>
        </div>
        <PresentationList list={data.presentations} />
        <Modal
          size="lg"
          aria-labelledby="create-presentation"
          centered
          show={isShowModal}
          onHide={closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title id="create-presentation">
              Create new presenttion
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(handleCreateNewPresentation)}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  {...register('presentationName')}
                  type="text"
                  placeholder="Example: Presentation 1"
                  isInvalid={!!errors.presentationName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.presentationName?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Group:</Form.Label>
                <Form.Select {...register('groupId')}>
                  <option value="">Public Presentation</option>
                  {groupList.data?.map((item, index) => (
                    <option key={index} value={item.group.id}>
                      {item.group.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </AppLayout>
  );
}

export default PresentationPage;
