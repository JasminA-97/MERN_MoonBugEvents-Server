const events = require('../models/eventModel');
const bookings = require('../models/booking')
const users = require('../models/userModel')

// Fetch all bookings with populated user and event details
exports.getAllBookings = async (req, res) => {
    try {
      const allBookings = await bookings.find()
        .populate('userId', 'username email phone')
        .populate('eventId', 'eventName');
      res.status(200).json(allBookings);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  //update booking status by admin
  exports.updateBookingStatus = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;
    try {
      const updatedBooking = await bookings.findByIdAndUpdate(bookingId,{status},{ new: true});
      if (updatedBooking) {
        res.status(200).json(updatedBooking);
      }else{
        return res.status(404).json('Booking not found');
      }
    } catch(err) {
      res.status(500).json(err);
    }
  };

  //get booking history of a single user who is logged-in
  exports.getBookingHistory = async (req,res)=>{
    const userId = req.payload
    try {
      const userBookings = await bookings.find({ userId })
        .populate('userId', 'username email phone')
        .populate('eventId', 'eventName');
      res.status(200).json(userBookings);
    } catch(err) {
      res.status(401).json(err);
    }

  }