import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Form } from 'react-bootstrap';
import './navbar.css'

function NavBar() {
  return (
    <Navbar expand="lg" className="nav-bar">
      <Container>
        <div className="container">
          <Navbar.Brand className="nav-item" href="/">
            <img src={require("../../assets/logo.png")} width="50" height="36" alt="preppal"></img>
          </Navbar.Brand>
          <Form>
            <Form.Control
              type="text"
              placeholder="Search"
              className="nav-item search-bar"
            />
          </Form>
        </div>
        <Nav className="links">
          <Nav.Link className="nav-item" href="collections">Collections</Nav.Link>
          <Nav.Link className="nav-item" href="profile">Profile</Nav.Link>
          <Nav.Link className="nav-item" href="login">Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar >
  );
}

export default NavBar;