import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Form } from 'react-bootstrap';
import './nav-bar.css'
import { useState } from 'react';

const NavBar = () => {
  const [loggedIn] = useState(false)
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">
        <img src={require("../../assets/logo.png")} width="50" height="40" alt="preppal"></img>
      </Navbar.Brand>
      <Form className="search-bar">
        <Form.Control
          type="text"
          placeholder="Search"
        />
      </Form>
      <Nav className="links">
        <Nav.Link className="nav-item" href="collections">Collections</Nav.Link>
        <Nav.Link className="nav-item" href="new-recipe">New Recipe</Nav.Link>
        {loggedIn
          ? (<Nav.Link className="nav-item" href="profile">Profile</Nav.Link>)
          : (<Nav.Link className="nav-item" href="login">Login</Nav.Link>)
        }
      </Nav>
    </Navbar >
  );
}

export default NavBar;