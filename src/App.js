import React from "react";
import "./scss/index.scss";
import { Container } from "react-bootstrap";
import Title from "./components/Title";
import FormProduct from "./components/FormProduct";

const App = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Title />
      <FormProduct />
    </Container>
  );
};

export default App;
