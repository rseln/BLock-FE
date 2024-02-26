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
import dayjs, { Dayjs } from 'dayjs';

const Home = () => {
  const {user, getAccessTokenSilently } = useAuth0();
  const today = new Date()
  var now = dayjs()
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
            const keypadCode = data[i].keypad_code
  
            parsedData.push({deviceId, timeFrame, keypadCode})
          } 
        }
        setBookings(parsedData)
        console.log(parsedData)
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
        deviceDateFilter(data);
      })
    }

    const deviceDateFilter = async (device_list) =>{
      console.log(device_list)
      if (device_list.length > 0) {
        console.log(device_list);
        const link = proxy
        const token = await getAccessTokenSilently();
        let filter_start = now;
        let filter_end = now.add(15, 'minute');
        await fetch(`${link}/devices/filter?startTime=${filter_start.utc().unix() + filter_start.utcOffset() * 60}&endTime=${filter_end.utc().unix() + filter_end.utcOffset() * 60}`,{
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
          let taken_set = new Set();
          data.forEach((device) => {
            taken_set.add(device.device_id);
          })
          console.log(taken_set);
          device_list.forEach((device) => {
            console.log(device);
            if (taken_set.has(device.device_id)) {
              device.status = "LOCKED";
            } else {
              device.status = "UNLOCKED";
            }
          });
          setDevices(device_list);
        })
      }
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

        { bookings.length === 0 ? (
        <>
          <Typography align="center" component="h5" variant="h5" sx={{ py: 5 }}>
            You have no lockers booked right now.  
          </Typography>
          <List>
          <Typography align="center" component="h3" variant="h3" sx={{ py: 3 }}>
            Locks Status:
          </Typography>
          {devices && devices.map(device => (
            <ListItem sx={{justifyContent:'center'}} key={device.device_id}>
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
              {/* <ListItemText primary={device.name} /> */}
            </ListItem>
          ))}
        </List>
        </>)
          :
          // NOT SURE WHAT THE DATA LOOKS LIKE SO HERES SOME SCUFFED CODE:
          (<>
          <Typography align="center" component="h4" variant='h4' sx={{ paddingBlock: '40px' }}>You have a booking right now:</Typography>
          <BookingDetail text="Locker Number" value={bookings[0].deviceId}></BookingDetail>
          <BookingDetail text="Keypad Code" value={bookings[0].keypadCode}></BookingDetail>
          <BookingDetail text="Booking Time Frame" value={(bookings[0].timeFrame)}></BookingDetail>
          <Typography align="center" component="p" sx={{ fontStyle: 'italic', paddingBlock: '50px' }}>
            Instructions: Enter the keypad code followed by # to unlock the locker. Press * to re-lock.
          </Typography>
          </>)
        }
        
      </Box>
    </Container>
  )
}

export default Home;