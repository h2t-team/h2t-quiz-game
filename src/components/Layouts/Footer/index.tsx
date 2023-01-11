import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col>
            <h2>About us</h2>
            <p>H2T Team</p>
          </Col>
          <Col>
            <h2>Contact</h2>
            <p>Email: h2tservice123@gmail.com</p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          Copyright 2022 H2T Team
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
