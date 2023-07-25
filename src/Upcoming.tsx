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


interface IBooking {
  date: string;
  startTime: string;
  endTime: string;
  // lock: number
}

const bookings: IBooking[] = [
  // { 
  //   date: "Wednesday, July 19, 2023", 
  //   startTime: "10:00 am",
  //   endTime: "11:00 am"
  // },
  // {
  //   date: "Thursday, July 20, 2023", 
  //   startTime: "5:30 pm",
  //   endTime: "7:00 pm"
  // },
  // {
  //   date: "Sunday, July 23, 2023",
  //   startTime: "7:30 pm",
  //   endTime: "9:00 pm"
  // },
];

const Upcoming = () => {
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
              (bookings.map((product, idx) => {
                return (
                  <>
                    {idx !== 0 && <Divider variant="middle" component="li" />}
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <EditIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={`${product.startTime} to ${product.endTime} on`}
                        secondary={product.date}
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
