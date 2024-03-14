import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './nav-bar.css';
import React from 'react';
import { FaSearch, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  React.useEffect(() => {
    fillUserContent();
  }, []);
  const navigate = useNavigate();

  const fillUserContent = async () => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    try {
      if (token && token !== "undefined") {
        setLoggedIn(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      return;
    }
    navigate(`/search?title=${encodeURIComponent(searchQuery)}`);
  };

  const searchButtonClick = () => {
    navigate(`/search?title=${searchQuery.trim() ? searchQuery.trim() : ""}`);
  }

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">
        <img src={require("../../assets/logo.png")} width="50" height="40" alt="preppal"></img>
      </Navbar.Brand>
      <Form className="search-bar" onSubmit={handleSearchSubmit}>
        <Form.Control
          type="text"
          placeholder="Quick Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        {searchQuery && (
          <Button variant="link" className="clear-btn" onClick={() => setSearchQuery("")}>
            <FaTimes />
          </Button>
        )}
        <Button variant="outline-light" className="search-btn" onClick={searchButtonClick}><FaSearch /></Button>
      </Form>

      <Nav className="links">
        {loggedIn && <Nav.Link as={Link} to="/collections" className="nav-item" title="collections-link">Collections</Nav.Link>}
        {loggedIn && <Nav.Link as={Link} to="/calendar" className="nav-item">Calendar</Nav.Link> }
        {loggedIn && <Nav.Link as={Link} to="/new-recipe" className="nav-item">New Recipe</Nav.Link>}
        {loggedIn
          ? (<Nav.Link as={Link} to="/profile" className="nav-item" title="profile-link">Profile</Nav.Link>)
          : (<Nav.Link as={Link} to="/login" className="nav-item" title="login-link">Login</Nav.Link>)
        }
      </Nav>
    </Navbar>
  );
};

export default NavBar;
