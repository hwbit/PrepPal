import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Form } from 'react-bootstrap';
import './nav-bar.css'
import React from 'react';

const NavBar = () => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [user, setUser] = React.useState('')

  React.useEffect(() => {
    fillUserContent();
    // eslint-disable-next-line
  }, []);

  const fillUserContent = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const req = {
          method: "GET",
          headers: {
            "x-auth-token": token
          }
        };
        const res = await fetch("http://localhost:9001/api/auth/", req).then(res => res.json());
        setUser(res.username);
        if (user !== "")
          setLoggedIn(true);
      }
    } catch (err) {
      console.error(err);
    }
  };


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
        {{loggedIn}
          ? (<Nav.Link className="nav-item" href="profile">Profile</Nav.Link>)
          : (<Nav.Link className="nav-item" href="login">Login</Nav.Link>)
        }
      </Nav>
    </Navbar >
  );
}

export default NavBar;