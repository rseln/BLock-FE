import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Stack from '@mui/material/Stack';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


async function submitLockBooking(credentials) {
  const link = 'https://59bb-72-142-18-42.ngrok-free.app'
  return fetch(`${link}'/bookings/create'`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
  })
  .then(data => data.json())
  .catch((error) => {
    console.log(error)
  })
}

const Booking = () => {
  const user_id = ""
  var now = dayjs()
  const [deviceID, setDeviceID] = React.useState<string | null>("");
  const [startTime, setStartTime] = React.useState<Dayjs>(now);
  const [endTime, setEndTime] = React.useState<Dayjs>(now);
    
  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = await submitLockBooking({
        deviceID,
        user_id,
        startTime,
        endTime
    })
    // setToken(token) what does this do?
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
              <DatePicker sx={{width: "-webkit-fill-available", my: 3}}/>
            </LocalizationProvider>
            <Typography component="h5" variant="h5">
              Select a Time
            </Typography>
            <Stack direction="row" spacing={2} sx={{my: 3}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  // if date it today, make sure min time is not a previous time
                  // minTime={today ? now : dayjs().set('hour', 0)} // NOT SURE IF IT SHOULD BE 0 OR WHAT
                  onChange={(newValue) => setStartTime(newValue)}
                />
                <TimePicker
                  label="End Time"
                  value={endTime}
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
                onChange={(e) => setDeviceID(e.target.value)}
              >
                <MenuItem value={""}>No Selection</MenuItem>
                <MenuItem value={"123"}>Lock 123</MenuItem>
                <MenuItem value={"234"}>Lock 234</MenuItem>
                <MenuItem value={"345"}>Lock 345</MenuItem>
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                href="/"
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
      </Container>
  );
}

export default Booking