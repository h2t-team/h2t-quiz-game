import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Nav, Form, Button } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';

function EditPresentationNav() {
  const { presentationId, slideIndex } = useParams();
  const navigate = useNavigate();
  
  const handlePresent = () => {
    if (!slideIndex) {
      navigate(`/${presentationId}/0/show`);
    }
    navigate(`/${presentationId}/${slideIndex}/show`);
  };

  return (
    <>
      <Nav className="me-auto">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Enter a title"
            aria-label="Title"
          />
        </Form>
      </Nav>
      <Nav className="align-items-center">
        <Button
          variant="success"
          className="d-flex fw-semibold align-items-center"
          onClick={handlePresent}
        >
          <FaPlay />
          <span className="ms-2">Present</span>
        </Button>
      </Nav>
    </>
  );
}

export default EditPresentationNav;
