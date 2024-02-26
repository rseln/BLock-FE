import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { CssBaseline } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { styled } from '@mui/material/styles';

const Content = styled('div')(({ theme }) => ({
  maxWidth:"sm",
  [theme.breakpoints.down('sm')]: {
    h2: {
      fontSize: "3rem"
    },
    h3: {
      fontSize: "2.2rem"
    },
  },
  [theme.breakpoints.up('sm')]: {
    h2: {
      fontSize: "3.75rem"
    },
    h3: {
      fontSize: "3rem"
    },
  },
}));

export default function ButtonAppBar({setOpen, open, ...props }) {
  const navigate = useNavigate(); 

  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
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
            {isAuthenticated && <Button color="inherit" onClick={handleLogout} >Logout</Button> }
          </Toolbar>
        </AppBar>
      </Box>
      <Content>
        <CssBaseline />
        {props.children}
      </Content>
    </div>
  );
}