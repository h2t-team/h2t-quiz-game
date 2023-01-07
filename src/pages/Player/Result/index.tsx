import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import { Chart, ChartType } from 'components/Chart';
import { Loader } from 'components/Common';
import logo from 'asset/images/logo.svg';
import styles from './Result.module.scss';
import config from 'config';
import { useQuery } from '@tanstack/react-query';
import { Presentation, Slide } from 'models/presentation.model';
import { axiosWithToken } from 'utils';

interface ChartData {
  name: string;
  value: number;
}

interface ReceiveData {
  slideIndex: number;
  data: ChartData[];
}

const socket = io(config.apiUrl);

const Result = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const { presentId, slideIndex } = useParams();
  const slideData = useQuery({
    queryKey: ['presentation', presentId],
    queryFn: async (): Promise<Presentation> => {
      const response = await axiosWithToken.get(`/presentation/${presentId}`);
      return response.data;
    },
  });
  const [currentSlide, setCurrentSlide] = useState<Slide>();
  const nav = useNavigate();

  useEffect(() => {
    socket.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('Socket disconnect');
    });

    socket.emit('join room', presentId);

    socket.on('join room', (msg) => {
      // eslint-disable-next-line no-console
      console.log(msg);
    });

    socket.emit('get data', { roomId: presentId });

    socket.on('receive data', (response: ReceiveData) => {
      if (response.slideIndex.toString() !== slideIndex) {
        nav(`/${presentId}/${response.slideIndex}/answer`);
      } else {
        setChartData(response.data);
      }
    });

    socket.on('change slide', ({ slideIndex }) => {
      nav(`/${presentId}/${slideIndex}/answer`);
    });

    socket.on('end slide', () => {
      nav('/join-game');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('join room');
      socket.off('receive data');
      socket.off('change slide');
    };
  }, []);

  useEffect(() => {
    socket.on('update info receive', ({ optionId }) => {
      const option = currentSlide?.pollSlides.findIndex(
        (item) => item.id.toString() === optionId
      );
      if (option !== undefined) {
        setChartData((prev) => {
          const newOption = [...prev];
          newOption[option].value += 1;
          return newOption;
        });
      }
    });

    socket.on('get data', () => {
      socket.emit('receive data', {
        slideIndex,
        data: chartData,
        roomId: presentId,
      });
    });

    return () => {
      socket.off('update info receive');
      socket.off('get data');
    };
  }, [currentSlide]);

  useEffect(() => {
    const curSlide = slideData.data?.slides.find(
      (item) => item.index.toString() === slideIndex
    );
    if (curSlide) {
      setCurrentSlide(curSlide);
    }
  }, [slideData.data, slideIndex]);

  if (chartData.length === 0 && slideData.isLoading) {
    return <Loader isFullPage />;
  }

  return (
    <div className={styles.resultPage}>
      <Container className="d-flex flex-column h-100">
        {currentSlide?.type === 'heading' ? (
          <h1 className={styles.heading}>{currentSlide?.title}</h1>
        ) : (
          <h1 className={styles.question}>
            {currentSlide?.type === 'poll' ? 'Result' : currentSlide?.title}{' '}
            <img src={logo} alt="H2T" height="50" />
          </h1>
        )}
        {currentSlide?.type === 'poll' ? (
          <div className={styles.chart}>
            <Chart type={ChartType.barChartType} data={chartData}></Chart>
          </div>
        ) : (
          currentSlide?.type === 'paragraph' && (
            <div className={styles.paragraph}>{currentSlide?.paragraph}</div>
          )
        )}
      </Container>
    </div>
  );
};
export default Result;
