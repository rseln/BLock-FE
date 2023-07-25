import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, CssBaseline } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";


export default function ButtonAppBar({ isLogged, setIsLogged, setOpen, open, ...props }) {
  const navigate = useNavigate(); 
  const location = useLocation();
  
  if(location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/welcome"){
    setIsLogged(false)
  }

  const handleLoginState = () => {
    if (isLogged) {
      setIsLogged(false)
      let path = `/login`; 
      navigate(path);
    } else {
      let path = `/login`; 
      navigate(path);
    }
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              B - Lock
            </Typography>
            <Button color="inherit" onClick={handleLoginState} >{isLogged ? "Logout" : "Login"}</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="sm">
      <CssBaseline />
        {props.children}
      </Container>
    </div>
  );
}