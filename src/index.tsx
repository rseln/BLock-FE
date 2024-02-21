import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    
// StrictMode can be turned back on for better testing, though keeping it will make things render twice
//   <React.StrictMode>
<>
    <Helmet>
        <title>B-Lock</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </Helmet>

    <App />
    </>
    //   </React.StrictMode>
);
