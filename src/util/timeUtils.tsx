import moment from "moment";

export const getDate = (timestamp) => {
    const date = timestamp.split('T')[0]
    return moment(date).format('dddd, MMMM Do YYYY')
}

export const getTime = (timestamp) => {
    console.log(timestamp)
    const time = timestamp.split('T')[1].substring(0, 5)
    console.log(time)
    return moment(time, 'HH:mm').utcOffset("-08:00").format('h:mm a'); 
}