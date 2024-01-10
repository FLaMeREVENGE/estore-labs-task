import React, { useState } from "react";
import "./scss/index.scss";
import Title from "./components/Title";
import FormProduct from "./components/FormProduct";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddProductClick = () => {
    setShowForm(true);
  };

  return (
    <>
      <div className="context">
        <Title onAddProductClick={handleAddProductClick} />
        {showForm && <FormProduct />}
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
