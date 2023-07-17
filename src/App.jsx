import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./Home";
import SignIn from "./SignIn";
import Login from "./Login";
import Register from "./Register";
import Bookings from "./Bookings";
import Layout from "./Layout"

const theme = createTheme({
    palette: {
    background: {
        default: "#e8f4fc"
    }
    },
  });

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
            <CssBaseline />
                <Layout>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<SignIn />} />
                        <Route path='/bookings' element={<Bookings />} />
                    </Routes>
                </Layout>
                </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;