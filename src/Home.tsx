import React, {useState, useEffect} from 'react'
// import Login from "./Login";
import SignIn from "./SignIn";
import BookingDetail from './components/BookingDetail';
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
  const [bookings, setBookings] = useState([])

  if(false){
    {return <SignIn setToken={setToken}/>}
  }

  // TODO: we want to get with user_id param
  const getBookings = () => {
    const link = 'https://59bb-72-142-18-42.ngrok-free.app'
    fetch(`${link}'/bookings/'`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response  => {return response.json()})
    .then(data => {
      setBookings(data)
    })
  }

  // useEffect(() => {
  //   getBookings()
  // }, [])

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
        { bookings.length === 0 ? 
          (<Typography align="left" component="h5" variant="h5" sx={{ py: 5 }}>
            You have no lockers booked right now.  
          </Typography>)
          :
          // NOT SURE WHAT THE DATA LOOKS LIKE SO HERES SOME SCUFFED CODE:
          (<>
          <BookingDetail text="Locker Number" value={bookings[0].lockNum}></BookingDetail>
          <BookingDetail text="Key" value={bookings[0].password}></BookingDetail>
          <BookingDetail text="Booking Time Frame" value={bookings[0].timeFrame}></BookingDetail>
          </>)
        }
        
      </Box>
    </Container>
  )
}

export default Home