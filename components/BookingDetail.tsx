import Typography from '@mui/material/Typography';

const BookingDetail = (props) => {
    return (
      <Typography align="left" component="h4" variant="h4" sx={{ py: 2 }}>
        {props.text}: <b>{props.value}</b>
      </Typography>
    )
}

export default BookingDetail