import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { Form, Stack } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Slide } from 'models/presentation.model';
import { axiosWithToken } from 'utils';
import { Loader } from 'components/Common';
import PollForm from 'components/Form/PollForm';
import ParagraphForm from 'components/Form/ParagraphForm';
import HeadingForm from 'components/Form/HeadingForm';

interface SlideOptionProps {
  slideInfo?: Slide;
  presentationId: string;
  slideIndex: string;
}

const SlideOption: React.FC<SlideOptionProps> = ({
  slideInfo,
  presentationId,
}) => {
  const queryClient = useQueryClient();
  const [type, setType] = useState(slideInfo?.type);

  useEffect(() => {
    setType(slideInfo?.type);
  }, [slideInfo]);

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
        queryKey: [
          ['slideDetail', slideInfo?.index],
          ['presentation', presentationId],
        ],
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
          <Form.Select onChange={handleSaveType} value={type}>
            <option value="poll">
              Poll
            </option>
            <option value="paragraph">
              Paragraph
            </option>
            <option value="heading">
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
