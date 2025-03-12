import React from "react";
import Navigation from "./Navigation";
import MyContext from "../context";

const App = () => {
  return (
    <MyContext>
      <Navigation />
    </MyContext>
  );
};

export default App;
