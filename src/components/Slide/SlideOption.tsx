/* eslint-disable no-unused-vars */
import React, { ChangeEventHandler, useState } from 'react';
import { Alert, Button, Form, Stack } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Slide } from 'models/presentation.model';
import { axiosWithToken } from 'utils';
import { Loader } from 'components/Common';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PollForm from 'components/Form/PollForm';
import ParagraphForm from 'components/Form/ParagraphForm';
import HeadingForm from 'components/Form/HeadingForm';

interface SlideOptionProps {
  slideInfo?: Slide;
  presentationId: string;
  slideIndex: string;
}

interface IFormInput {
  title: string;
  option1: string;
  option2: string;
}

const SlideOption: React.FC<SlideOptionProps> = ({
  slideInfo,
  presentationId,
  slideIndex,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [type, setType] = useState(slideInfo?.type);
  const mutation = useMutation({
    mutationFn: (type: string) => {
      return axiosWithToken.patch(`/slide/${slideInfo?.id}/type`, {
        type,
      });
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['slideDetail', slideInfo?.index],
      });
    },
  });

  const handleSaveType: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    if (!mutation.isLoading) {
      mutation.mutate(value);
    }
    setType(value);
  };

  return (
    <Stack>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Slide Type:</Form.Label>
          <Form.Select onChange={handleSaveType}>
            <option selected={type === 'poll'} value="poll">
              Poll
            </option>
            <option selected={type === 'paragraph'} value="paragraph">
              Paragraph
            </option>
            <option selected={type === 'heading'} value="heading">
              Heading
            </option>
          </Form.Select>
        </Form.Group>
      </Form>
      {mutation.isLoading ? (
        <Loader />
      ) : type === 'poll' ? (
        <PollForm slideInfo={slideInfo} />
      ) : type === 'paragraph' ? (
        <ParagraphForm slideInfo={slideInfo} />
      ) : (
        <HeadingForm slideInfo={slideInfo} />
      )}
    </Stack>
  );
};

export default SlideOption;
