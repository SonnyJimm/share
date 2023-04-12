import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { NavBar } from "./components";
import PageHandler from "./pages";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const changeActivePage = (id) => {
    setCurrentPage(id);
  };

  const pages = {
    "Main Task": 0,
    OTP: 1,
    "Dynamic form": 2,
    "Stop Watch": 3,
    useRef: 4,
  };
  return (
    <div>
      <NavBar
        pages={pages}
        currentPage={currentPage}
        changeActivePage={changeActivePage}
      />
      <Container className="content">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <PageHandler currentPage={currentPage} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
