import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosWithToken } from 'utils';
import { Container, Form, Button } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import logo from 'asset/images/logo-vertical.svg';
import styles from './Answer.module.scss';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'components/Common';
import { Presentation, Slide } from 'models/presentation.model';
import { StoreContext } from 'store';

interface IFormInput {
  answer: string;
}

const schema = yup
  .object({
    answer: yup.string().required('Please choose an option'),
  })
  .required();

interface ReceiveData {
  slideIndex: number;
}

const Answer: React.FC = () => {
  const {
    globalState: { socket },
  } = useContext(StoreContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { presentId, slideIndex } = useParams();
  const slideData = useQuery({
    queryKey: ['presentation', presentId],
    queryFn: async (): Promise<Presentation> => {
      const response = await axiosWithToken.get(`/presentation/${presentId}`);
      return response.data;
    },
  });
  const [currentSlide, setCurrentSlide] = useState<Slide | undefined>(
    undefined
  );
  const nav = useNavigate();

  useEffect(() => {
    socket.emit('join room', presentId);

    socket.on('join room', (msg) => {
      // eslint-disable-next-line no-console
      console.log(msg);
      socket.emit('get data', { roomId: presentId });
    });

    socket.on('receive data', (response: ReceiveData) => {
      if (response.slideIndex.toString() !== slideIndex) {
        nav(`/${presentId}/${response.slideIndex}/answer`);
      }
    });

    socket.on('change slide', ({ slideIndex }) => {
      nav(`/${presentId}/${slideIndex}/answer`);
    });

    socket.on('end slide', () => {
      nav('/join-game');
    });

    return () => {
      socket.off('join room');
      socket.off('change slide');
      socket.off('end slide');
      socket.off('receive data');
    };
  }, [presentId, slideIndex]);

  useEffect(() => {
    const curSlide = slideData.data?.slides.find(
      (item) => item.index.toString() === slideIndex
    );
    setCurrentSlide(curSlide);
  }, [slideData.data, slideIndex]);

  useEffect(() => {
    if (
      currentSlide?.type === 'heading' ||
      currentSlide?.type === 'paragraph'
    ) {
      nav(`/${presentId}/${slideIndex}/result`, { replace: true });
    }
  }, [currentSlide]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    socket.emit('update info send', {
      roomId: presentId,
      optionId: data.answer,
    });
    nav(`/${presentId}/${slideIndex}/result`, { replace: true });
  };

  if (slideData.isLoading) {
    return <Loader isFullPage />;
  }

  return (
    <div className={styles.answerPage}>
      <Container>
        <div className={styles.logo}>
          <img src={logo} alt="H2T" />
        </div>
        <div className={styles.answerForm}>
          <h1 className="fw-bold">{currentSlide?.title}</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              {currentSlide?.pollSlides.map((option) => (
                <Form.Check
                  key={option.id}
                  className={styles.radioBox}
                  {...register('answer')}
                  id={option.id.toString()}
                  type="radio"
                  value={option.id}
                  label={option.option}
                  isInvalid={!!errors.answer}
                />
              ))}
              <Form.Control.Feedback
                type="invalid"
                className={`${errors.answer ? 'd-block' : ''}`}
              >
                {errors.answer?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              size="lg"
              variant="primary"
              type="submit"
              className="w-100 fw-bold mt-4 rounded-0"
            >
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Answer;
