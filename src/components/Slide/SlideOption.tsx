import React from 'react';
import { Form } from 'react-bootstrap';

const SlideOption = () => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Slide Type:</Form.Label>
        <Form.Select>
          <option>Poll</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Your question:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a question"
          aria-label="Title"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Options:</Form.Label>
        <Form.Control
          type="text"
          className="mb-3"
          placeholder="Option 1"
          aria-label="Option 1"
        />
        <Form.Control
          type="text"
          className="mb-3"
          placeholder="Option 2"
          aria-label="Option 2"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Chart Type:</Form.Label>
        <Form.Select>
          <option>Bar chart</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
};

export default SlideOption;
