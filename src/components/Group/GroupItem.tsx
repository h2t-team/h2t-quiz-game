import { GroupByUser } from 'models';
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Button, Card, Row, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

interface GroupItemProps {
  data: GroupByUser;
  // eslint-disable-next-line no-unused-vars
  // onRemoveGroup: (index: number) => void;
}

const GroupItem: React.FC<GroupItemProps> = ({ data }) => {
  const navigate = useNavigate();

  const navigateToGroup = () => {
    navigate(`/groups/${data.group.id}`);
  };

  const [show, setShow] = useState(false);

  const handleCloseCofirmDelete = () => setShow(false);
  const handleShowCofirmDelete = () => setShow(true);

  return (
    <>
      <Card border="primary">
        <Row className="no-gutters">
          <div className="col-sm-10">
            <Card.Body>
              <Card.Title className="fs-3">{data.group.name}</Card.Title>
              <Card.Text className="fs-6 fw-semibold">
                Owner: {data.group.ownerUser.fullname}
              </Card.Text>
              <Card.Text className="mb-3 fs-6">My role: {data.role}</Card.Text>
              <Button
                variant="primary"
                onClick={navigateToGroup}
                className="fs-6 fw-semibold"
              >
                Go to group
              </Button>
            </Card.Body>
          </div>
          <div className="col-sm-2">
            <Card.Body>
              <FaTrashAlt
                className="mr-auto"
                id={data.group.id.toString()}
                // eslint-disable-next-line no-console
                onClick={handleShowCofirmDelete}
              />
            </Card.Body>
          </div>
        </Row>
      </Card>
      <Modal show={show} onHide={handleCloseCofirmDelete} backdrop="static" centered>
        <Modal.Header closeButton> Delete {data.group.name}?
        </Modal.Header>
        <Modal.Body>You cannot undo this action</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCofirmDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleCloseCofirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GroupItem;
