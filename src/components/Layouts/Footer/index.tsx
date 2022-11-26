import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import styles from './Footer.module.scss';

function Footer() {
  return <footer className={styles.footer}>
    <Container>
      <Row>
        <Col>
          <h2>About us</h2>
          <p>Lorem</p>
          <p>Lorem</p>
          <p>Lorem</p>
          <p>Lorem</p>
        </Col>
        <Col>
          <h2>Contact</h2>
          <p>Lorem</p>
          <p>Lorem</p>
          <p>Lorem</p>
          <p>Lorem</p>
        </Col>
        <Col>
          <h2>Contact</h2>
          <p>Lorem</p>
          <p>Lorem</p>
          <p>Lorem</p>
          <p>Lorem</p>
        </Col>
        <Col>
          <h2>Contact</h2>
          <p>Lorem</p>
          <p>Lorem</p>
          <p>Lorem</p>
          <p>Lorem</p>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">Copyright 2022 H2T Team</Row>
    </Container>
  </footer>;
}

export default Footer;
