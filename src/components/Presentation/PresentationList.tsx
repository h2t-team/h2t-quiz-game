import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PresentationList() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Link to="/presentations/123/edit">Name</Link>
          </td>
          <td>Created At</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default PresentationList;