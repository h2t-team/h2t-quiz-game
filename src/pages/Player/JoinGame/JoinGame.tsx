import React from 'react';
import { Col, Container, Form, Button } from 'react-bootstrap';
import styles from './JoinGame.module.scss';
const JoinGame = () => {
  return (
    <div className={styles.joinGamePage}>
      <Container>
        <Col>
          <h1 className={styles.mainTitle}>QUIZY</h1>
        </Col>
        <Col className={styles.verticalMainForm}>
          <Form>
            <Form.Group>
              <Form.Control
                size="lg"
                className={styles.input}
                type="text"
                placeholder="NICKNAME"
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                size="lg"
                className={styles.input}
                type="text"
                placeholder="GAME PIN"
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button
                size="lg"
                variant="primary"
                type="submit"
                className={styles.formSubmit}
              >
                ENTER
              </Button>
            </div>
          </Form>
        </Col>
      </Container>
    </div>
  );
};

export default JoinGame;
