import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./NavigationBar.css";
function Navigationbar() {
    const location = useLocation();
    return (
        <Navbar className="nav-pills" collapseOnSelect bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                <img src="./assets/favicon.ico" width="30" height="30"/>
                &nbsp; RNAGym
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" defaultActiveKey="/" activeKey={location.pathname}>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/benchmarks">Benchmarks</Nav.Link>
                        <Nav.Link as={Link} to="/download">Download</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Navigationbar;