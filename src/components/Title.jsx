import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Title = () => {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1 className="title display-1">estore labs</h1>
          <Button variant="light">Add product</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Title;
