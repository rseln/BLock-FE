import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./Home";
import Booking from "./Booking";
import Layout from "./Layout";
import Upcoming from "./Upcoming";
import Welcome from "./Welcome";
import { useOnClickOutside } from './util/hooks';
import { useState, useRef } from "react";
import Menu from "./components/Menu";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";

const theme = createTheme({
  palette: {
    background: {
      default: "#e8f4fc",
    },
    primary: {
      main: '#0D0C1D',
      light: '#EFFFFA',
      dark: '#343078',
      contrastText: '#fff', // Add this line if necessary
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  typography: {
    fontFamily: [
      '"Open Sans"',
      'Roboto',
    ].join(','),
  }
});
const AuthenticationGuard = ({component, ...args}) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

const Auth0ProviderWithRedirectCallback = ({ children, domain, clientId, authorizationParams }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider domain={domain} clientId={clientId} onRedirectCallback={onRedirectCallback} authorizationParams={authorizationParams} >
      {children}
    </Auth0Provider>
  );
};

function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  return (
    <BrowserRouter>
      <Auth0ProviderWithRedirectCallback
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
            redirect_uri: window.location.origin + "/home",
            audience: process.env.REACT_APP_AUTH0_AUDIENCE_ID,
            scope: "read:current_user update:current_user_metadata" //currently useless
          }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout setOpen={setOpen} open={open}>
            <Routes>
              <Route path="/">
                <Route index element = {<Welcome />}/>
                <Route path="booking" element={<AuthenticationGuard component={Booking}/>} />
                <Route path="upcoming" element={<AuthenticationGuard component={Upcoming}/>} />
                <Route path="home" element={<AuthenticationGuard component={Home}/>} />
              </Route>
            </Routes>
            <div ref={node}>
              {/* <Burger open={open} setOpen={setOpen} /> */}
              <Menu open={open} setOpen={setOpen}/>
            </div>
          </Layout>
        </ThemeProvider>
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  );
}

export default App;
