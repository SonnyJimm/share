import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = ({ pages, currentPage, changeActivePage }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Home work W5</Navbar.Brand>
        <Nav className="me-auto">
          {Object.keys(pages).map((key, id) => (
            <Nav.Link
              key={id}
              active={currentPage === pages[key]}
              onClick={() => {
                changeActivePage(pages[key]);
              }}
            >
              {key}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default NavBar;
