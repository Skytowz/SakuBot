module.exports.getDateFromTimeStamp = (timestamp) => {
    return this.getDate(new Date(timestamp));
}

module.exports.getDate = (date) =>{
    return (date.getDate() < 10 ? "0" : "") + date.getDate() + "/" + ((date.getMonth()+1)<10 ? "0" : "") +(date.getMonth()+1) +"/"+ date.getFullYear();
}