import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
// StrictMode can be turned bac on for better testing, though keeping it will make things render twice
//   <React.StrictMode>
    <App />
//   </React.StrictMode>
);
