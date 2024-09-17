import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";

import React from "react";

const Header = () => {
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="">Master-Match</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="about">About us</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <NavLink to="/login">
          <Col xs="auto">
            <Button type="button" variant="success" className="navbar-btn">
              Log In / Sign up
            </Button>
          </Col>
        </NavLink>
      </Container>
    </Navbar>
  );
};

export default Header;
