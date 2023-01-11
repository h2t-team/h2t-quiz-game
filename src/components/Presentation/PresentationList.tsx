import { PresentationInfo } from 'models/presentation.model';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface PresentationListProps {
  list: PresentationInfo[];
  // eslint-disable-next-line no-unused-vars
  onRemovePresentation: (presentation: any) => void;
}

const PresentationList: React.FC<PresentationListProps> = ({
  list,
  onRemovePresentation,
}) => {
  const presentationList = list.map((presentation) => {
    return (
      <tr key={presentation.id}>
        <td>
          <Link to={`/presentations/${presentation.id}/edit`}>
            {presentation.name}
          </Link>
        </td>
        <td>{presentation['group.name'] || 'Public'}</td>
        <td>{presentation.inviteCode}</td>
        <td>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onRemovePresentation(presentation)}
          >
            Remove
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Group</th>
          <th>Pin Code</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{presentationList}</tbody>
    </Table>
  );
};

export default PresentationList;
