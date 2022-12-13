import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import io from 'socket.io-client';

import { Chart, ChartType } from 'components/Chart';
import { Loader } from 'components/Common';
import { axiosWithToken } from 'utils';
import logo from 'asset/images/logo.svg';
import styles from './SlideShow.module.scss';
import config from 'config';
import { Presentation, Slide } from 'models/presentation.model';

interface ChartData {
  name: string;
  value: number;
}

const socket = io(config.apiUrl);

const SlideShow = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [currentSlide, setCurrentSlide] = useState<Slide>();
  const { presentId, slideId } = useParams();
  const nav = useNavigate();
  const slideData = useQuery({
    queryKey: ['presentation', presentId],
    queryFn: async (): Promise<Presentation> => {
      const response = await axiosWithToken.get(`/presentation/${presentId}`);
      return response.data;
    },
  });

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

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('join room');
    };
  }, [presentId, slideId]);

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
        slideId,
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
      (item) => item.id.toString() === slideId
    );
    if (curSlide) {
      const data = curSlide.pollSlides.map((item) => {
        const mapData: ChartData = {
          name: item.option,
          value: item.amount,
        };
        return mapData;
      });
      setCurrentSlide(curSlide);
      setChartData(data);
    }
  }, [slideData.isSuccess, slideId]);

  useEffect(() => {
    socket.emit('receive data', {
      slideId,
      data: chartData,
      roomId: presentId,
    });
  }, [chartData]);

  const saveOption = async () => {
    try {
      const promiseList = chartData.map((item, index) => {
        return axiosWithToken.patch('/slide', {
          optionId: currentSlide?.pollSlides[index].id,
          amount: item.value,
        });
      });
      await Promise.all(promiseList);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const changeSlideSocketEvent = (slideId: number) => {
    socket.emit('change slide', {
      roomId: presentId,
      slideId,
    });
  };

  const nextSlide = async () => {
    await saveOption();
    const index = currentSlide?.index || 0;
    const isLast = index + 1 === slideData.data?.slides.length;
    if (isLast) {
      nav(`/${presentId}/${slideId}`, { replace: true });
    } else {
      const nextIndex = slideData.data?.slides[index + 1].id as number;
      changeSlideSocketEvent(nextIndex);
      nav(`/${presentId}/${nextIndex}/show`);
    }
  };

  const prevSlide = async () => {
    await saveOption();
    const index = currentSlide?.index || 0;
    const isFirst = index === 0;
    if (!isFirst) {
      const prevIndex = slideData.data?.slides[index - 1].id as number;
      changeSlideSocketEvent(prevIndex);
      nav(`/${presentId}/${prevIndex}/show`);
    } else {
      nav(`/${presentId}/${slideId}`, { replace: true });
    }
  };

  if (slideData.isLoading) {
    return <Loader isFullPage />;
  }

  return (
    <div className={styles.slideShowPage}>
      <Container>
        <h1 className={styles.question}>
          {currentSlide?.title} <img src={logo} alt="H2T" height="40" />
        </h1>
        <div className={styles.chart}>
          <Chart type={ChartType.barChartType} data={chartData}></Chart>
        </div>
        <div className={styles.navigate}>
          <Button variant="primary" onClick={prevSlide}>
            Prev
          </Button>
          <Button variant="primary" onClick={nextSlide}>
            Next
          </Button>
        </div>
      </Container>
    </div>
  );
};
export default SlideShow;
