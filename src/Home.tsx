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
import { proxy } from './util/constants';
import { getTime } from './util/timeUtils';
import { useNavigate } from "react-router-dom";

const today = new Date()

const estimateTime = () => {
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
  const [keypadCode, setKeypadCode] = useState()

  const navigate = useNavigate(); 
  useEffect(() => {
    if (sessionStorage.getItem("userId") === null) {
      let path = `/login`; 
      navigate(path);
    }
  })

  const getHomePageData = () => {
    const link = proxy
    // TODO: Change this hardcoded userId
    const userId = sessionStorage.getItem("userId")
    fetch(`${link}/bookings?user_id=${userId}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response  => {return response.json()})
    .then(data => {
      const parsedData = []
      for (let i in data) {
        const start = data[i].start_time
        const end = data[i].end_time
        
        if (new Date(start) <= today && new Date(end) >= today) {
          const deviceId = data[i].device_id
          getKeypadCode(deviceId)

          const startTime = getTime(start)
          const endTime =  getTime(end)
          const timeFrame = `${startTime} to ${endTime}`

          parsedData.push({deviceId, timeFrame})
        }  
      }
      setBookings(parsedData)
      console.log(data)
    })
  }

  const getKeypadCode = (deviceId) => {
    const link = proxy
    fetch(`${link}/devices?device_id=${deviceId}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response  => {return response.json()})
    .then(data => {
      setKeypadCode(data[0].keypad_code)
    })
  }

  useEffect(() => {
    getHomePageData()
  }, [])

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Typography align="center" component="h2" variant="h2" sx={{ py: 5 }}>
          {estimateTime()}
        </Typography>
        { bookings.length === 0 ? 
          (<Typography align="center" component="h5" variant="h5" sx={{ py: 5 }}>
            You have no lockers booked right now.  
          </Typography>)
          :
          // NOT SURE WHAT THE DATA LOOKS LIKE SO HERES SOME SCUFFED CODE:
          (<>
          <BookingDetail text="Locker Number" value={bookings[0].deviceId}></BookingDetail>
          <BookingDetail text="Keypad Code" value={keypadCode}></BookingDetail>
          <BookingDetail text="Booking Time Frame" value={bookings[0].timeFrame}></BookingDetail>
          </>)
        }
        
      </Box>
    </Container>
  )
}

export default Home