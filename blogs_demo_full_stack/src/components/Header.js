import React from 'react';
import { Navbar, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import logo from '../images/blogify_logo.png';

const Header = () => {
    const headerStyle = {
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    };

    return (
        <Navbar bg="light" expand="md" style={headerStyle}>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        height="30"
                        className="d-inline-block align-top"
                        alt="Your Logo"
                    />
                </Navbar.Brand>
                <InputGroup className="ms-auto">
                    <FormControl placeholder="Search..." />
                    <Button variant='dark'>
                        <FaSearch />
                    </Button>
                </InputGroup>
            </Container>
        </Navbar>
    );
}

export default Header;
