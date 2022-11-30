import { Group } from 'models';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import GroupItem from './GroupItem';

interface GroupListProps {
  list: Group[];
}

const GroupList: React.FC<GroupListProps> = ({ list }) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {list.map((group) => (
        <Col key={group.id}>
          <GroupItem data={group} />
        </Col>
      ))}
    </Row>
  );
};

export default GroupList;
