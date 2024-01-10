import React from "react";
import "./scss/index.scss";
import Title from "./components/Title";
import FormProduct from "./components/FormProduct";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <div className="context">
        <Title />
        <FormProduct />
      </div>
      <div className="background">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default App;
