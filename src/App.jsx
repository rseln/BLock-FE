import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./Home";
import SignIn from "./SignIn";
import Login from "./Login";
import Register from "./Register";
import Bookings from "./Bookings";
import Booking from "./Booking";
import Layout from "./Layout";
import Upcoming from "./Upcoming";
import Welcome from "./Welcome";
import { useOnClickOutside } from './hooks';
import React, { useEffect, useState, useRef } from "react";
import Burger from "../components/Burger"
import Menu from "../components/Menu"

const theme = createTheme({
  palette: {
    background: {
      default: "#e8f4fc",
    },
  },
  primaryDark: '#0D0C1D',
  primaryLight: '#EFFFFA',
  primaryHover: '#343078',
  mobile: '576px',
});

function App() {
  const [isLogged, setIsLogged] = useState(true);
  const [open, setOpen] = useState(false);

  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout isLogged={isLogged} setIsLogged={setIsLogged} setOpen={setOpen} open={open}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/booking" element={<Booking userID={1}/>} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/welcome" element={<Welcome />} />
          </Routes>
          <div ref={node}>
            {/* <Burger open={open} setOpen={setOpen} /> */}
            <Menu open={open} setOpen={setOpen} />
          </div>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
