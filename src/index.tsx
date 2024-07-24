import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "sanitize.css";
import { GlobalStyle } from "./style/global";
import { state, ThemeContext } from "./context/theme";

async function mountApp() {
  if (process.env.NODE_ENV === "development") {
    const { worker } = require("./mock/browser");
    await worker.start();
  }

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

mountApp();
