import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, CssBaseline } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';


export default function ButtonAppBar({setOpen, open, ...props }) {
  const navigate = useNavigate(); 

  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin + "/BLock-FE",
      }
    })
  }
  
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {isAuthenticated && <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              B - Lock
            </Typography>
            {isAuthenticated && <Button color="inherit" onClick={handleLogout} >{"Logout"}</Button> }
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