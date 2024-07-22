const express = require('express');
const userController = require('../controllers/userController')
const eventController = require('../controllers/eventController')
const bookingController = require('../controllers/bookingController')
const reviewController = require('../controllers/reviewController')
const jwtMiddleware = require('../middlewares/jwtMiddleware');

const router = new express.Router();

//register
router.post('/register',userController.registerUser)

//login
router.post('/login',userController.loginUser)

//add event
router.post('/events/addEvent',jwtMiddleware,eventController.addEvent);

//getAllEvents based on searchkey
router.get('/events', eventController.getAllEvents);

//updateEvent
router.put('/events/:eid/edit', eventController.editEvent);

//deleteEvent
router.delete('/events/:eid/delete', eventController.removeEvent);

//  Get all events for each user
 router.get('/all-events',jwtMiddleware, eventController.getFullEvents);

 //  Get all event for home page
 router.get('/all-event', eventController.getFullEvents);

// Book an event
router.post('/events/bookings',jwtMiddleware, eventController.bookEvent);

//  Get all bookings
router.get('/all-bookings',bookingController.getAllBookings);

//update booking status by admin
router.put('/all-bookings/:bookingId',bookingController.updateBookingStatus);

//get booking history of a single user who is logged-in
router.get('/user-bookings',jwtMiddleware,bookingController.getBookingHistory);

//user edit his booking
router.put('/user-bookings/:bookingId/edit', jwtMiddleware, bookingController.userEditBooking);

//user delete his booking
router.delete('/user-bookings/:bookingId/delete', jwtMiddleware, bookingController.userDeleteBooking);

//get all users from booking collection for adminViewBooking
router.get('/users-with-bookings', jwtMiddleware, bookingController.getUsersWithBookings);

//edit user profile
router.put('/user/edit', jwtMiddleware, userController.editProfile);

//user add a review
router.post('/review/add',jwtMiddleware,reviewController.addReview)

 //  Get all reviews for home page
 router.get('/all-reviews', reviewController.getReviews);

module.exports = router;