import moment from "moment";

export const getDate = (timestamp) => {
    return moment.utc(timestamp).format('dddd, MMMM Do YYYY')
}

export const getTime = (timestamp) => {
    return moment.utc(timestamp).local().format('h:mm a'); 
}