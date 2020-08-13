import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { StateProvider } from "./redux/StateProvider";
import reducer, { initialState } from "./redux/reducer";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
