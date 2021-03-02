let getStringWithZeros = (number: number) => number<10 ? `0${number}` : `${number}`;

let getDateStringFromDate = (date?: Date) => 
{
    if(date)
    {
        var newDate = new Date(date);
        return `${getStringWithZeros(newDate.getDay())}.${getStringWithZeros(newDate.getMonth())}.${getStringWithZeros(newDate.getFullYear())}`
    }
    else
        return ''
}

let getDateStringWithTimeFromDate = (date?: Date) => 
{
    if(date)
    {
        var newDate = new Date(date);
        return `${newDate.toLocaleDateString()} ${getStringWithZeros(newDate.getHours())}:${getStringWithZeros(newDate.getMinutes())}`
    }
    else
        return ''
}

let unixTimeStampToDateString = (timeStamp?:number) => 
{
    if(timeStamp)
    {
        return new Date(timeStamp * 1000)
    }
    else
        return new Date();
}

let getTimeStringFromDate = (date?: Date) => 
{
    if(date)
    {
        var newDate = new Date(date);
        return `${getStringWithZeros(newDate.getHours())}:${getStringWithZeros(newDate.getMinutes())}`
    }
    else
        return ''
}

export {getStringWithZeros, getDateStringFromDate, getDateStringWithTimeFromDate, unixTimeStampToDateString, getTimeStringFromDate}

