import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './MenuStyled';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HomeIcon from '@mui/icons-material/Home';
import { useAuth0 } from '@auth0/auth0-react';


const Menu = ({ open, setOpen, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  const {logout} = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      }
    })
  }

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <IconButton
        size="large"
        color="inherit"
        aria-label="close"
        sx={{ mr: 2, width:"fit-content" }}
        onClick={() => setOpen(!open)}
      >
        <CloseIcon />
      </IconButton>
      <a href="/home" tabIndex={tabIndex}>
        <span aria-hidden="true"><HomeIcon/></span>
        Home
      </a>
      <a href="/upcoming" tabIndex={tabIndex}>
        <span aria-hidden="true"><EventAvailableIcon/></span>
        Upcoming
      </a>
      <a href="/booking" tabIndex={tabIndex}>
        <span aria-hidden="true"><CalendarMonthIcon/></span>
        Book
      </a>
      <a href="/" tabIndex={tabIndex} onClick={handleLogout}>
        <span aria-hidden="true"><LogoutIcon/></span>
        Logout
      </a>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;