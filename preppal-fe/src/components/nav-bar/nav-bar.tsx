import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './nav-bar.css';
import React from 'react';
import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  React.useEffect(() => {
    fillUserContent();
  }, []);
  const navigate = useNavigate();

  const fillUserContent = async () => {
    const token = sessionStorage.getItem("token");
    try {
      if (token) {
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
    navigate(`/search/${encodeURIComponent(searchQuery)}`);
  };

  const searchButtonClick = () => {
    navigate(`/search/${searchQuery.trim() ? searchQuery.trim() : ""}`);
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
        <Button variant="outline-light" onClick={searchButtonClick} className="search-btn"><FaSearch /></Button>
      </Form>

      <Nav className="links">
        {loggedIn ? <Nav.Link as={Link} to="/collections" className="nav-item">Collections</Nav.Link> : <br></br>}
        {loggedIn ? <Nav.Link as={Link} to="/new-recipe" className="nav-item">New Recipe</Nav.Link> : <br></br>}
        {loggedIn
          ? (<Nav.Link as={Link} to="/profile" className="nav-item">Profile</Nav.Link>)
          : (<Nav.Link as={Link} to="/login" className="nav-item">Login</Nav.Link>)
        }
      </Nav>
    </Navbar>
  );
};

export default NavBar;
