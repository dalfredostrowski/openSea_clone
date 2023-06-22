import React, { Component } from 'react';
import { BrowserRouter ,Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap'


const Header = () =>
{
 return (
        <Navbar expand="lg" bg="secondary" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/create">Create</Nav.Link>
                        <Nav.Link as={Link} to="/my-listed-items">My Listed Items</Nav.Link>
                        <Nav.Link as={Link} to="/my-purchases">My Purchases</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
)}

export default Header;

