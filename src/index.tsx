import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
const container = document.getElementById("root");
const root = createRoot(container!)

root.render(
    <App />
);

