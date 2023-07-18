import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import Stack from '@mui/material/Stack';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// async function LoginUser(credentials) {
//     return fetch('http://localhost:8080/login',{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     }).then(data => data.json())
// }

const defaultTheme = createTheme();

const Booking = () => {
  const [startTime, setStartTime] = React.useState<Dayjs  | null>(dayjs('2022-04-17T15:30'));
  const [endTime, setEndTime] = React.useState<Dayjs  | null>(dayjs('2022-04-17T15:30'));

  
  const handleSubmit = async (e) => {
      e.preventDefault()
  }

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Stack direction="row" spacing={2} sx={{marginBlock: 3}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker sx={{width: "-webkit-fill-available"}}/>
            </LocalizationProvider>
          </Stack>
            <Stack direction="row" spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                />
                <TimePicker
                  label="End Time"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                />
              </LocalizationProvider>
            </Stack>
            <FormControl fullWidth sx={{marginBlock: 3}}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Select a lock
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: 'lockNum',
                  // id: 'uncontrolled-native',
                }}
              >
                <option value={123}>Lock 123</option>
                <option value={234}>Lock 234</option>
                <option value={345}>Lock 345</option>
              </NativeSelect>
            </FormControl>
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
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
    </ThemeProvider>
  );
}

export default Booking