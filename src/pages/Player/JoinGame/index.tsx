import React from 'react';
import { Col, Container, Form, Button } from 'react-bootstrap';
import logo from 'asset/images/logo-vertical.svg';
import styles from './JoinGame.module.scss';

const JoinGame = () => {
  return (
    <div className={styles.joinGamePage}>
      <Container>
        <div className={styles.logo}>
          <img src={logo} alt="H2T" />
        </div>
        <Col className={styles.joinForm}>
          <Form>
            <Form.Group>
              <Form.Control size="lg" type="text" placeholder="Game pin" />
            </Form.Group>
            <Button
              size="lg"
              variant="primary"
              type="submit"
              className="w-100 fw-bold"
            >
              Enter
            </Button>
          </Form>
        </Col>
      </Container>
    </div>
  );
};

export default JoinGame;
