import React from "react";
import { render } from "react-dom";
import "./index.scss";
import App from "./App";
import { StateProvider } from "./store";

render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
