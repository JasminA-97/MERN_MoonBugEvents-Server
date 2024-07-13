const events = require('../models/eventModel');
const bookings = require('../models/booking')
const users = require('../models/userModel')

// Fetch all bookings with populated user and event details
exports.getAllBookings = async (req, res) => {
  console.log('inside getAllBookings');
    try {
      const allBookings = await bookings.find()
        .populate('userId', 'username email phone')
        .populate('eventId', 'eventName');
      res.status(200).json(allBookings);
    } catch (err) {
      res.status(401).json(err);
    }
  };

  //update booking status by admin
  exports.updateBookingStatus = async (req, res) => {
    console.log('inside updateBookingStatus');
    const { bookingId } = req.params;
    const { status } = req.body;
    try {
      const updatedBookingStatus = await bookings.findByIdAndUpdate(bookingId,{status},{ new: true});
      if (updatedBookingStatus) {
        res.status(200).json(updatedBookingStatus);
      }else{
        return res.status(404).json('Booking not found');
      }
    } catch(err) {
      res.status(401).json(err);
    }
  };

  //get booking history of a single user who is logged-in
  exports.getBookingHistory = async (req,res)=>{
    console.log('inside getBookingHistory');
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

//user edit his booking
exports.userEditBooking = async (req, res) => {
  console.log('inside userEditBooking');
  const { userId } = req.payload;
  const { bookingId } = req.params;
  const { eventId, date, location, requirements } = req.body;
  try {
    const userUpdatedBooking = await bookings.findByIdAndUpdate(
      { _id: bookingId, userId }, 
      { eventId, date, location, requirements }, 
      { new: true }
    );
    if (userUpdatedBooking) {
      res.status(200).json(userUpdatedBooking);
    } else {
      return res.status(404).json('Booking not found');
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

//user delete his booking
exports.userDeleteBooking = async(req,res)=>{
  console.log('inside userDeleteBooking');
  const {bookingId} =req.params
  try{
    const deletedEvent = await bookings.findByIdAndDelete({_id:bookingId}) 
    res.status(200).json(deletedEvent)
  }catch(err){
    res.status(401).json(err)
  }
}

//get all users from booking collection for adminViewBooking
exports.getUsersWithBookings = async (req, res) => {
  console.log('indside getUsersWithBookings');
  try {
    const usersWithBookings = await bookings.aggregate([
      {
        $lookup: {
          from: 'users', // Collection name for users
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' },
      {
        $group: {
          _id: '$userId',
          name: { $first: '$userDetails.username' }, // Adjust this based on your user schema
          email: { $first: '$userDetails.email' },
          phone: { $first: '$userDetails.phone' }
        }
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          name: 1,
          email: 1,
          phone: 1
        }
      }
    ]);

    res.status(200).json(usersWithBookings);
  } catch (err) {
    console.error(err);
  }
};