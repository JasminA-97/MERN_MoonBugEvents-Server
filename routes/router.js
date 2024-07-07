const express = require('express');
const userController = require('../controllers/userController')
const eventController = require('../controllers/eventController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

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

//  Get all events
 router.get('/all-events', eventController.getFullEvents);

// Book an event
router.post('/events/bookings',jwtMiddleware, eventController.bookEvent);



module.exports = router;