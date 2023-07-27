// import * as React from 'react';
import React, {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";

const link = 'http://localhost:8080'

async function RegisterUser(credentials) {
  const test = {
    "first_name": 'NOT',
    "last_name": 'Posie',
    "email": 'rosedawg@uwaterloo.ca',
    "password": 'password',
    "daily_credits_available": 120,
    "watiam": "kys"
  }
  sessionStorage.setItem("credentials", JSON.stringify(test));
  console.log(JSON.stringify(test), sessionStorage.getItem("credentials"))
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Basic ');
  headers.append('Origin','http://localhost:3000');

    return fetch(`${link}/users/create`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(credentials),
        body: JSON.stringify(test)
      })
      // .then(data => data.json())
}

async function getUser() {
    return fetch(`${link}/users/create`,{
        method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(credentials),
        // mode: 'no-cors',
        // body: JSON.stringify(test)
      })
      .then(data => console.log("DATA", data.json()))
}

export default function SignUp() {
  const DAILY_CREDS = 120
  const [firstName, setFirstName] = React.useState<string | undefined>()
  const [lastName, setLastName] = React.useState<string | undefined>()
  const [email, setEmail] = React.useState<string | undefined>()
  const [password, setPassword] = React.useState<string | undefined>()
  const [watIAM, setWatIAM] = React.useState<string | undefined>()

  // useEffect(() => {
  //   // getBookings()
  // }, [])
  const navigate = useNavigate(); 
    
  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = await RegisterUser({
      firstName,
      lastName,
      email,
      password,
      DAILY_CREDS,
      watIAM,
    }).then((res)=> {
      if (res.status === 200) {
        navigate(`/`);
      }
      return res.json()
    })
    sessionStorage.setItem("userId", userId[0]["user_id"])
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
          <Avatar sx={{ m: 1, bgcolor: '#92D1CF' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e)=>setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e)=>setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="WatIAM"
                  label="WatIAM"
                  name="WatIAM"
                  autoComplete="WatIAM"
                  onChange={(e)=>setWatIAM(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}