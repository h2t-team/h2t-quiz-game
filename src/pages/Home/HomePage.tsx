import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AppLayout } from 'components/Layouts';
import logo from 'asset/images/logo-vertical.svg';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <AppLayout>
      <div className={styles.homepage}>
        <Row className={styles.content}>
          <Col md={6} className="d-flex justify-content-center">
            <img src={logo} alt="H2T" />
          </Col>
          <Col md={6}>
            <h1>WELCOME TO<br/>H2T QUIZ GAME</h1>
            <Link to="/join-game" className="btn btn-primary mx-3 fw-bolder">
              Let&apos;s play now
            </Link>
          </Col>
        </Row>
      </div>
    </AppLayout>
  );
};

export default HomePage;
