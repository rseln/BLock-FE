import React, {useState, useEffect} from 'react'
// import Login from "./Login";
import BookingDetail from './components/BookingDetail';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { proxy } from './util/constants';
import { getTime } from './util/timeUtils';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { Cancel, CheckCircle } from '@mui/icons-material';
import { green, red } from '@mui/material/colors';

const Home = () => {
  const {user, getAccessTokenSilently } = useAuth0();
  const today = new Date()
  const [devices, setDevices] = useState<Array<any>>();
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
  const [bookings, setBookings] = useState([])
  
  useEffect(()=>{
    const getHomePageData = async () => {
      const link = proxy
      const token = await getAccessTokenSilently();
      fetch(`${link}/bookings?user_id=${encodeURIComponent(user.sub)}`,{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`
          },
      })
      .then(response  => {return response.json()})
      .then(async data => {
        console.log("HELLO", data)
        const parsedData = []
        for (let i in data) {
          const start = data[i].start_time
          const end = data[i].end_time
          
          if (new Date(start) <= today && new Date(end) >= today) {
            const deviceId = data[i].device_id
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
    
    const getDevices = async () =>{
      const link = proxy
      const token = await getAccessTokenSilently();
      await fetch(`${link}/devices`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
      }).then((res)=>{
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      }).then((data)=>{
        setDevices(data);
      })
    }

    getDevices();
    getHomePageData();
  },[])

  

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
        
        <Typography align="center" component="h2" variant="h2" sx={{ py: 3 }}>
          {estimateTime()}
        </Typography>
        <List>
          <Typography align="center" component="h3" variant="h3" sx={{ py: 3 }}>
            Locks:
          </Typography>
          {devices && devices.map(device => (
            <ListItem  sx={{ marginLeft: '36%' }}>
              {device.status === 'UNLOCKED' ? (
                <Typography component="h5" variant="h5">
                  Lock {device.device_id}
                  <CheckCircle sx={{ margin: '0px 0px -3px 5px', color: green[500] }} />
                </Typography>
              ) : (
                <Typography component="h5" variant="h5">
                  Lock {device.device_id}
                  <Cancel sx={{ margin: '0px 0px -3px 5px', color: red[500] }} />
                </Typography>
              )}
              <ListItemText primary={device.name} />
            </ListItem>
          ))}
        </List>

        { bookings.length === 0 ? 
          (<Typography align="center" component="h5" variant="h5" sx={{ py: 5 }}>
            You have no lockers booked right now.  
          </Typography>)
          :
          // NOT SURE WHAT THE DATA LOOKS LIKE SO HERES SOME SCUFFED CODE:
          (<>
          <Typography align="center" component="h6" variant="h6">
            Instructions: Enter the keypad code followed by # to unlock the locker. Press * to re-lock.
          </Typography>
          <BookingDetail text="Locker Number" value={bookings[0].deviceId}></BookingDetail>
          <BookingDetail text="Keypad Code" value={bookings[0].keypad_code}></BookingDetail>
          <BookingDetail text="Booking Time Frame" value={bookings[0].timeFrame}></BookingDetail>
          </>)
        }
        
      </Box>
    </Container>
  )
}

export default Home;