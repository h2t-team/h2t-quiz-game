import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import { Chart, ChartType } from 'components/Chart';
import { Loader } from 'components/Common';
import logo from 'asset/images/logo.svg';
import styles from './Result.module.scss';
import config from 'config';

interface ChartData {
  name: string;
  value: number;
}

interface ReceiveData {
  slideId: number;
  data: ChartData[];
}

const socket = io(config.apiUrl);

const Result = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const { presentId, slideId } = useParams();
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
      if (response.slideId.toString() !== slideId) {
        nav(`/${presentId}/${response.slideId}/answer`);
      } else {
        setChartData(response.data);
      }
    });

    socket.on('change slide', ({ slideId }) => {
      nav(`/${presentId}/${slideId}/answer`);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('join room');
      socket.off('receive data');
      socket.off('change slide');
    };
  }, []);

  if (chartData.length === 0) {
    return <Loader isFullPage />;
  }

  return (
    <div className={styles.resultPage}>
      <Container>
        <h1 className={styles.question}>
          Result <img src={logo} alt="H2T" height="40" />
        </h1>
        <div className={styles.chart}>
          <Chart type={ChartType.barChartType} data={chartData}></Chart>
        </div>
      </Container>
    </div>
  );
};
export default Result;
