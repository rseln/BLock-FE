import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import { createTheme } from '@mui/material/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { proxy } from './util/constants';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

  // NOTES:
  // - Retrieve devices from API and only show the ones that are available for use.
const Booking: React.FC = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const {state} = useLocation();
  console.log("state", state)
  
  const navigate = useNavigate(); 
  var now = dayjs()
  const [deviceID, setDeviceID] = React.useState<Number>(0);
  const [startTime, setStartTime] = React.useState<Dayjs>(now);
  const [endTime, setEndTime] = React.useState<Dayjs>(now);
  const [date, setDate] = React.useState<Dayjs>(now);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("Error");

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  useEffect(() => {
    if (state) {
      // setDeviceID(state.device)
      console.log(dayjs(state.start_time))
      setStartTime(dayjs(state.start_time))
      setEndTime(dayjs(state.end_time))
      setDate(dayjs(state.end_time))
    }
  }, [])

  const getDevices = async () =>{
    const link = proxy
    const token = await getAccessTokenSilently();
    await fetch(`${link}/bookings/create`,{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let dateString = date.format('YYYY-MM-DD')
    let start_time = dateString + " " + startTime.format('HH:mm:ss')
    let end_time = dateString + " " + endTime.format('HH:mm:ss')
    const token = await getAccessTokenSilently();
    const link = proxy
    await fetch(`${link}/bookings/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          device_id: deviceID,
          user_id: user.sub,
          start_time,
          end_time
        })
    })
    .then((res) => {
      if(res.ok){
        navigate(`/home`);
      } else {
        res.json().then(errorData => setErrorMessage(errorData.error));
        setOpenSnackbar(true);
      }
      return res.json()
    })
    .catch((error) => {
      console.log("error:", error);
      return error
    })
  }
  
  return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h3" variant="h3">
            Booking a Lock
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography component="h5" variant="h5" sx={{ mt: 2 }}>
              Select a Day
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                sx={{width: "-webkit-fill-available", my: 3}}
              />
            </LocalizationProvider>
            <Typography component="h5" variant="h5">
              Select a Time
            </Typography>
            <Stack direction="row" spacing={2} sx={{my: 3}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  minutesStep={15}
                  // if date it today, make sure min time is not a previous time
                  // minTime={today ? now : dayjs().set('hour', 0)} // NOT SURE IF IT SHOULD BE 0 OR WHAT
                  onChange={(newValue) => setStartTime(newValue)}
                />
                <TimePicker
                  label="End Time"
                  value={endTime}
                  minutesStep={15}
                  maxTime={startTime.add(3, 'hour')}
                  onChange={(newValue) => setEndTime(newValue)}
                />
              </LocalizationProvider>
            </Stack>
            <Typography component="h5" variant="h5">
              Select a Lock (Optional)
            </Typography>
            <FormControl fullWidth sx={{marginBlock: 3}}>
              <InputLabel id="select-lock-label">
                Select a lock
              </InputLabel>
              <Select
                labelId="select-lock-label"
                id="select-lock"
                value={deviceID}
                label="Select a lock"
                onChange={(e) => setDeviceID(Number(e.target.value))}
              >
                <MenuItem value={0}>No Selection</MenuItem> 
                <MenuItem value={1}>Lock 1</MenuItem>
                <MenuItem value={2}>Lock 2</MenuItem>
                <MenuItem value={3}>Lock 3</MenuItem>
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                href="/home"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Book Now
              </Button>
            </Stack>
          </Box>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message={errorMessage}
        />
      </Container>
  );
}

export default Booking;