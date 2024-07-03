const mongoose=require('mongoose')
const eventSchema = new mongoose.Schema({
    eventName:{
        type:String,
        required:true
    },
    eventCost:{
        type:Number,
        required:true
    },
    eventDescription:{
        type:String,
        required:true
    }
});
const events = mongoose.model('events',eventSchema);
module.exports = events;