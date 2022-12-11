import React from 'react';
import { AppLayout } from 'components/Layouts';
import { Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import PresentationList from 'components/Presentation/PresentationList';

function PresentationPage() {
  return (
    <AppLayout>
      <h1 className="mb-4">My presentations</h1>
      <div className=" d-flex justify-content-between">
        <ButtonGroup className="mb-4">
          <Button variant="info" className="d-flex align-items-center">
            <AiOutlinePlus />
            <span className="ms-1">New presentation</span>
          </Button>
        </ButtonGroup>
        <Form className="mb-4">
          <InputGroup>
            <InputGroup.Text>
              <AiOutlineSearch />
            </InputGroup.Text>
            <Form.Control type="text" placeholder="Type to search" />
          </InputGroup>
        </Form>
      </div>
      <PresentationList />
    </AppLayout>
  );
}

export default PresentationPage;
