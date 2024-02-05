import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate()
  useEffect(()=>{
      navigate("/home"); // a bit hacky rn but works due to authentication guard: )
  },[])
  return (
      <div></div>
  );
};

export default Welcome;
