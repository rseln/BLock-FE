import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Stack,
  Button
} from "@mui/material";

const Welcome = () => {
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
            Welcome!
          </Typography>
          <Typography component="h5" variant="h5">
            Keep your belongings safe with B-Lock.
          </Typography>
          <Stack direction="row" spacing={2} sx={{width:"80%"}}>
              <Button
                fullWidth
                variant="outlined"
                href="/login"
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="contained"
                href="/register"
              >
                Sign Up
              </Button>
            </Stack>
        </Box>
      </Container>
  );
};

export default Welcome;
