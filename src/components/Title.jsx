import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Title = ({ onAddProductClick, showForm }) => {
  return (
    <Container className='title'>
      <Row>
        <Col className="text-center">
          <h1 className="title__text display-1">estore labs</h1>
          {!showForm && (
            <Button variant="light" className='title__button' onClick={onAddProductClick}>Add product</Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Title;
