import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";
import Login from "./Login";
import Register from "./Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;