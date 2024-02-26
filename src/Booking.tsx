import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker  } from '@mui/x-date-pickers/MobileTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { proxy } from './util/constants';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { addTimeWithCeiling, roundDownTime, roundUpTime } from './util/timeUtils';


dayjs.extend(utc);

  // NOTES:
  // - Retrieve devices from API and only show the ones that are available for use.
const Booking: React.FC = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const {state} = useLocation();
  
  const navigate = useNavigate(); 
  var now = dayjs()

  const [availDevices, setAvailDevices] = useState<Array<any>>([]);
  const [deviceID, setDeviceID] = React.useState<Number>(0);
  const [startTime, setStartTime] = React.useState<Dayjs>(roundUpTime(now));
  const [endTime, setEndTime] = React.useState<Dayjs>(roundUpTime(now.add(15, "minute")));
  const [date, setDate] = React.useState<Dayjs>(now);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("Error");
  const [minStart, setMinStart] = React.useState(null);
  const [minEnd, setMinEnd] = React.useState(null);

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

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
      console.log(data)
      data = data.filter(device => device.status === "NOT BOOKED");
      return data;
    }).then((data) => deviceDateFilter(data))
    console.log(availDevices)
  }

  const deviceDateFilter = async (device_list) =>{
    console.log("WE ARE NOW FILTERING")
    console.log(device_list)
    if (device_list.length > 0) {
      console.log(device_list);
      const link = proxy
      const token = await getAccessTokenSilently();
      let filter_start = startTime.year(date.year()).month(date.month()).date(date.date());
      let filter_end = endTime.year(date.year()).month(date.month()).date(date.date());
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
        let new_avail = [];
        device_list.forEach((device) => {
          console.log(device);
          if (!(taken_set.has(device.device_id))) {
            new_avail.push(device)
          }
        });
        setAvailDevices(new_avail);
      })
    }
  }

  useEffect(() => {
    if (state) {
      // setDeviceID(state.device)
      setStartTime(dayjs(state.start_time))
      setEndTime(dayjs(state.end_time))
      setDate(dayjs(state.end_time))
    }
  }, [])

  useEffect(() => {
    let testing = false;
    console.log(startTime.add(3, 'hour'));
    if (!testing) {
      // enforce min start time and end time rules
      if (date > now) {
        setMinStart(null);
        setMinEnd(null);
      } else {
        setMinStart(roundDownTime(now));
        setMinEnd(roundUpTime(now).add(15, 'minute'));
      }
      // when start is changed to after end, shift end
      if (endTime <= startTime) {
        setEndTime(startTime.add(15, 'minute'));
      } else if (endTime.diff(startTime, 'minute') > 180) {
        // if greater than 3 hour diff
        setEndTime(addTimeWithCeiling(startTime, 3, 'hour'));
      }
    }

    getDevices();
  }, [startTime, endTime, date])


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
          device_id: deviceID === 0 ? availDevices[0].device_id : deviceID,
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
                minDate={now}
                onChange={(newValue) => setDate(newValue)}
                sx={{width: "-webkit-fill-available", my: 3}}
              />
            </LocalizationProvider>
            <Typography component="h5" variant="h5">
              Select a Time
            </Typography>
            <Stack direction="row" spacing={2} sx={{my: 3}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker 
                  label="Start Time"
                  value={startTime}
                  minTime={minStart}
                  minutesStep={15}
                  // if date it today, make sure min time is not a previous time
                  // minTime={today ? now : dayjs().set('hour', 0)} // NOT SURE IF IT SHOULD BE 0 OR WHAT
                  onChange={(newValue) => setStartTime(newValue)}
                />
                <MobileTimePicker 
                  label="End Time"
                  value={endTime}
                  minutesStep={15}
                  minTime={minEnd}
                  maxTime={addTimeWithCeiling(startTime, 3, 'hour')}
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
                disabled={availDevices.length === 0}
                onChange={(e) => setDeviceID(Number(e.target.value))}
              >
                <MenuItem value={0}>No Selection</MenuItem> 
                {
                  availDevices && availDevices.map(device => (
                       <MenuItem key={device.device_id}value={device.device_id}>Lock {device.device_id}</MenuItem>   
                    )
                  )
                }
              </Select>
              {availDevices.length === 0 && <p>No locks available for the time requested.</p>}
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
                disabled={availDevices.length === 0}
              >
                Book Now
              </Button>
            </Stack>
          </Box>
        </Box>
        {openSnackbar && <Alert severity="error" variant="outlined">{errorMessage}</Alert>}
      </Container>
  );
}

export default Booking;