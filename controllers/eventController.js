const events = require('../models/eventModel');
const bookings = require('../models/booking')

exports.addEvent = async (req, res) => {
  const { eventName, eventCost, eventDescription } = req.body;
  console.log("inside addEvent");
  const userId = req.payload;
  const eventImg = req.file.filename

  try{
    const existingEvent = await events.findOne({eventName})
    if(existingEvent){
        res.status(406).json('Event is already in DB...Add another!')
    }else{
        const newEvent = new events({ eventName, eventCost, eventDescription,eventImg});
        await newEvent.save();
        res.status(200).json(newEvent);
    }
  }catch (error){
    res.status(401).json(err);
}
};

exports.getAllEvents = async(req,res)=>{
    const searchKey = req.query.search
    const query = {
        eventName : {
            $regex:searchKey,
            $options:"i"
        }
    }
    console.log('inside getAllEvents');
    try{
        const allevents = await events.find(query)
        res.status(200).json(allevents)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.editEvent = async(req,res)=>{
    console.log('inside editEvent');
    const {eid}=req.params
    const {eventName,eventCost,eventDescription,eventImg}=req.body
    const uploadImg = req.file?req.file.filename:eventImg
    const userId=req.payload
    try{
        const updatedEvent = await events.findByIdAndUpdate({_id:eid},{eventName,eventCost,eventDescription,eventImg:uploadImg,userId},{new:true})
        await updatedEvent.save()
        res.status(200).json(updatedEvent)
    }catch(err){
        res.status(401).json(err);
    }
}

exports.removeEvent = async(req,res)=>{
    console.log('inside deleteEvent');
    const {eid}= req.params
    try{
        const deletedEvent = await events.findByIdAndDelete({_id:eid})
        res.status(200).json(deletedEvent)
    }catch(err){
        res.status(401).json(err);
    }
}

//for each user
exports.getFullEvents = async (req, res) => {
  console.log('inside getFullEvents');
  try {
    const fullEvents = await events.find();
    res.status(200).json(fullEvents);
  } catch(err){
    res.status(400).json(err);
  }
};


//Get SingleEvent by id
exports.getSingleEventById = async (req, res) => {
    console.log('inside getSingleEventById');
    const { eid } = req.params;
    try {
      const event = await events.findById(eid);
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json('Event not found');
      }
    } catch (err) {
      res.status(400).json(err);
    }
  };
  
exports.bookEvent = async (req, res) => {
    console.log('inside bookEvent');
    const { eventId, date, location, requirements } = req.body;
    const userId = req.payload;

    try {
        const existingBooking = await bookings.findOne({ eventId, date });
        console.log(existingBooking);
        if (existingBooking) {
            res.status(406).json('Booking is already in DB.. Add another date!');
        } else {
            const newBooking = new bookings({ userId, eventId, date, location, requirements });
            await newBooking.save();
            res.status(200).json(newBooking);
        }
    } catch (err) {
        console.error(err);
        res.status(401).json('Error occurred while booking the event');
    }

};