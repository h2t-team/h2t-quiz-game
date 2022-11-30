import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface GroupItemProps {
  data: any;
}

const GroupItem: React.FC<GroupItemProps> = ({ data }) => {
  const navigate = useNavigate();

  const navigateToGroup = () => {
    navigate(`/groups/${data.group.id}`);
  };  

  return (
    <Card border="primary">
      <Card.Body>
        <Card.Title className="fs-2">{data.group.name}</Card.Title>
        <Card.Text>Role: {data.role}</Card.Text>
        <Button variant="primary" onClick={navigateToGroup}>Go to group</Button>
      </Card.Body>
    </Card>
  );
};

export default GroupItem;
