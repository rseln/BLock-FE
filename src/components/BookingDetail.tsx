import Typography from '@mui/material/Typography';

const BookingDetail = (props) => {
    return (
      <Typography align="center" component="h5" variant="h5" sx={{ py: 1 }}>
        {props.text}: <b>{props.value}</b>
      </Typography>
    )
}

export default BookingDetail