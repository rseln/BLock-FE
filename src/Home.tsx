import React, {useState} from 'react'
import Login from "./Login";
import SignIn from "./SignIn";
import BookingDetail from '../components/BookingDetail';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';


const estimateTime = () => {
  const today = new Date() 
  const curHour = today.getHours()

  if (5 < curHour && curHour < 12) {
    return "Good Morning!🌅"
  } else if (12 <= curHour && curHour < 17) {
    return "Good Afternoon!☀️"
  } else if (17 <= curHour && curHour < 21){
    return "Good Evening!🌇"
  } else {
    return "Good Night!🌃"
  }
}

const Home = () => {
    const [token, setToken] = useState()
    if(false){
        {return <SignIn setToken={setToken}/>}
    }
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Typography align="left" component="h2" variant="h2" sx={{ py: 5 }}>
          {estimateTime()}
        </Typography>
        
        <BookingDetail text="Locker Number" value="3029"></BookingDetail>
        <BookingDetail text="Key" value="5968"></BookingDetail>
        <BookingDetail text="Booking Time Frame" value="WE GOTTA MAKE THIS BETTER"></BookingDetail>
      </Box>
    </Container>
  )
}

export default Home