import Typography from '@mui/material/Typography';

const BookingDetail = (props) => {
    return (
        <Typography align="center" component="h2" variant="h4">
          {props.text}: <b>{props.value}</b>
        </Typography>
    )
}

export default BookingDetail