import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { clearItem, isLogin } from 'utils';

const AppNav: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    clearItem('h2t_access_token');
    navigate('/login');
  };

  return (
    <>
      <Nav className="me-auto">
        <Nav.Link as={NavLink} to="/" className="mx-2">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/groups" className="mx-2">
          Group
        </Nav.Link>
        <Nav.Link as={NavLink} to="/presentations" className="mx-2">
          Presentations
        </Nav.Link>
      </Nav>
      {isLogin() ? (
        <Nav>
          <Link to="/join-game" className="btn btn-primary mx-3 fw-bolder">
            Join a game
          </Link>
          <NavDropdown
            title="Username"
            id="navbarScrollingDropdown"
            className="mx-2 align-self-center"
            key="down-centered"
          >
            <NavDropdown.Item as={NavLink} to="/profile">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleSignOut}>
              Sign out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      ) : (
        <Nav className="align-items-center">
          <Link to="/register" className="btn btn-success mx-3 fw-bolder">
            Sign up
          </Link>
          <Link to="/login" className="btn-underline fw-bolder">
            Sign in
          </Link>
        </Nav>
      )}
    </>
  );
};

export default AppNav;
