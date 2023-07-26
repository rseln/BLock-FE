import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './MenuStyled';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const Menu = ({ open, setOpen, setIsLogged, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

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
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">🏠</span>
        Home Page
      </a>
      <a href="/upcoming" tabIndex={tabIndex}>
        <span aria-hidden="true">💁🏻‍♂️</span>
        Upcoming Bookings
      </a>
      <a href="/booking" tabIndex={tabIndex}>
        <span aria-hidden="true">💸</span>
        Book Here
        </a>
      <a href="/welcome" tabIndex={tabIndex} onClick={setIsLogged(false)} >
        <span aria-hidden="true">📩</span>
        Logout
        </a>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;