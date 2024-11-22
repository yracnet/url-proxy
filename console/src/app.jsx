import React from "react";
import { Card, Col, Container, Navbar, Row } from "react-bootstrap";

export const App = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">URL Proxy</Navbar.Brand>
      </Navbar>
      <Container fluid>
        <Row className="my-4">
          <Col md={8}>
            <Card>
              <Card.Body>
                Aquí puede ir contenido adicional como enlaces o información
                extra.
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                Aquí puede ir contenido adicional como enlaces o información
                extra.
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
