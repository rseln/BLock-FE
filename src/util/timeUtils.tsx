import moment from "moment";

export const getDate = (timestamp) => {
    return moment.utc(timestamp).local().format('dddd, MMMM Do YYYY')
}

export const getTime = (timestamp) => {
    return moment.utc(timestamp).local().format('h:mm a'); 
}

export const roundUpTime = (timestamp) => {
    let hours = timestamp.hour();
    let minutes = timestamp.minute();
    let seconds = timestamp.second();
    
    if (minutes > 0 && minutes <= 15) {
        minutes = 15;
    } else if (minutes > 15 && minutes <= 30) {
        minutes = 30;
    } else if (minutes > 30 && minutes <= 45) {
        minutes = 45;
    } else {
        hours += 1;
        minutes = 0;
    }
    seconds = 0;

    return timestamp.hour(hours).minute(minutes).second(seconds);
}

export const addTimeWithCeiling = (timestamp, addend, unit) => {
    let new_time = timestamp.add(addend, unit);
    if (new_time.date() > timestamp.date()) {
        return timestamp.hour(23).minute(45).second(0);
    } else {
        return new_time;
    }
}
