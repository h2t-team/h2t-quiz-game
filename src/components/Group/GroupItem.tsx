import { GroupByUser } from 'models';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface GroupItemProps {
  data: GroupByUser;
}

const GroupItem: React.FC<GroupItemProps> = ({ data }) => {
  const navigate = useNavigate();

  const navigateToGroup = () => {
    navigate(`/groups/${data.group.id}`);
  };

  return (
    <Card border="primary">
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
    </Card>
  );
};

export default GroupItem;
