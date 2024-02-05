import React, {useState, useEffect} from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { proxy } from './util/constants';
import { getDate, getTime } from './util/timeUtils';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';


interface IBooking {
  date: string;
  startTime: string;
  endTime: string;
  // lock: number
}

const Upcoming = () => {  
  const {user, getAccessTokenSilently} = useAuth0()
  const [bookings, setBookings] = useState([])
  const [this_start, setStart] = useState()
  const [this_end, setEnd] = useState()

  const handleEditBooking = (reservation) => {
    console.log("reservation ",reservation, this_start, this_end)
    navigate('/booking', { state: {start_time: this_start, end_time:this_end} });
  }
  // const [bookings, setBookings] = useState(mockBookings)

  const navigate = useNavigate(); 
  // TODO: we want to get with user_id param
  const getBookings = async () => {
    const link = proxy
    const token = await getAccessTokenSilently()
    console.log(encodeURIComponent(user.sub))
    fetch(`${link}/bookings?user_id=${encodeURIComponent(user.sub)}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
    })
    .then(response  => {return response.json()})
    .then(data => {
      console.log(data)
      const parsedData = [];
      for (let i in data) {
        const date = getDate(data[i].start_time)
        const startTime = getTime(data[i].start_time)
        const endTime =  getTime(data[i].end_time)

        parsedData.push({date, startTime, endTime})
      }
      // console.log(data.start_time)
      setBookings(parsedData)
      if(data[0]){
        setStart(data[0].start_time)
        setEnd(data[0].end_time)
      }
      console.log(data)
    })
  }

  useEffect(() => {
    getBookings()
  }, [])

  return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h3" variant="h3">
            Upcoming Bookings
          </Typography>
            <List>
              {bookings.length > 0 ?
              (bookings.map((reservation, idx) => {
                return (
                  <>
                    {idx !== 0 && <Divider variant="middle" component="li" />}
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleEditBooking(reservation)}>
                          <EditIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={`${reservation.startTime} to ${reservation.endTime} on`}
                        secondary={reservation.date}
                      />
                    </ListItem>
                  </>
                );
              })) 
              : <>
                  You don't have any locks reserved!
                </>}
            </List>
        </Box>
      </Container>
  );
};

export default Upcoming;
