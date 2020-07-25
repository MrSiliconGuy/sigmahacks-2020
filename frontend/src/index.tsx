import React from "react";
import { render } from "react-dom";
import "./index.scss";
import App from "./App";
import { StateProvider } from "./store";
import "regenerator-runtime/runtime";

render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
