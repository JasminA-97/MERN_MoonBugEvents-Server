const express = require('express');
const userController = require('../controllers/userController')

const eventController = require('../controllers/eventController')

const router = new express.Router();

//register
router.post('/register',userController.registerUser)

//login
router.post('/login',userController.loginUser)

//add event
router.post('/events/addEvent', eventController.addEvent);

//getAllEvents
router.get('/events', eventController.getAllEvents);

//updateEvent
router.put('/events/:eid/edit', eventController.editEvent);

//deleteEvent
router.delete('/events/:eid/delete', eventController.removeEvent);

module.exports = router