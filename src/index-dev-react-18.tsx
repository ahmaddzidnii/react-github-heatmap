import React, { StrictMode, version } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

console.log("Parent folder loaded react version: ", version);

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
