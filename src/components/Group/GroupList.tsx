import { GroupByUser } from 'models';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import GroupItem from './GroupItem';

interface GroupListProps {
  list: GroupByUser[];
}

const GroupList: React.FC<GroupListProps> = ({ list }) => {
  if (!list.length) {
    return (
      <p className="text-center fw-semibold">
        You have not in any groups. Let&apos;s create or join a group.
      </p>
    );
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {list
        .filter((groupByUser) => groupByUser.role !== 'kick out')
        .map((groupByUser) => (
          <Col key={groupByUser.group.id}>
            <GroupItem data={groupByUser} />
          </Col>
        ))}
    </Row>
  );
};

export default GroupList;
