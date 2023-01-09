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
  const { presentId, slideIndex } = useParams();
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
  }, [presentId, slideIndex]);

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
  }, [slideData.data, slideIndex]);

  useEffect(() => {
    socket.emit('receive data', {
      slideIndex,
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

  const endPresent = async () => {
    try {
      return await axiosWithToken.patch('/presentation', {
        isPresent: false,
        id: presentId,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const changeSlideSocketEvent = (slideIndex: number) => {
    socket.emit('change slide', {
      roomId: presentId,
      slideIndex,
    });
  };

  const nextSlide = async () => {
    await saveOption();
    const index = currentSlide?.index || 0;
    const isLast = index + 1 === slideData.data?.slides.length;
    if (isLast) {
      socket.emit('end slide', {
        roomId: presentId,
      });
      await endPresent();
      nav(`/presentations/${presentId}/${slideIndex}/edit`, { replace: true });
    } else {
      const nextIndex = index + 1;
      changeSlideSocketEvent(nextIndex);
      nav(`/${presentId}/${nextIndex}/show`);
    }
  };

  const prevSlide = async () => {
    await saveOption();
    const index = currentSlide?.index || 0;
    const isFirst = index === 0;
    if (!isFirst) {
      const prevIndex = index - 1;
      changeSlideSocketEvent(prevIndex);
      nav(`/${presentId}/${prevIndex}/show`);
    } else {
      socket.emit('end slide', {
        roomId: presentId,
      });
      await endPresent();
      nav(`/presentations/${presentId}/${slideIndex}/edit`, { replace: true });
    }
  };

  if (slideData.isLoading) {
    return <Loader isFullPage />;
  }

  return (
    <div className={styles.slideShowPage}>
      <Container className="d-flex flex-column h-100">
        {currentSlide?.type === 'heading' ? (
          <h1 className={styles.heading}>{currentSlide?.title}</h1>
        ) : (
          <h1 className={styles.question}>
            {currentSlide?.title} <img src={logo} alt="H2T" height="50" />
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

        <div className="d-flex justify-content-between mt-auto">
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
