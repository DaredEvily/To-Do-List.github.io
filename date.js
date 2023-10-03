module.exports.date =()=>{
    const today = new Date()
    const options = {
    weekday:"long",
    day:"numeric",
    month:"long"
    }
    return today.toLocaleDateString("en-US",options)
}

module.exports.day = ()=>{
    const today = new Date()
    const options = {
        weekday:"long"
    }
    return today.toLocaleDateString("en-US",options)
}