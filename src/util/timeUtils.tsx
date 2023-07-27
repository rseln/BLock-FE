import moment from "moment";

export const getDate = (timestamp) => {
    const date = timestamp.split('T')[0]
    return moment(date).format('dddd, MMMM Do YYYY')
}

export const getTime = (timestamp) => {
    const time = timestamp.split('T')[1].substring(0, 5)
    return moment(time, 'HH:mm').format('h:mm a'); 
}