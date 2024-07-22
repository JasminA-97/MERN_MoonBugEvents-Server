const mongoose = require('mongoose')
const reviewSchema =new mongoose.Schema({
    review: {
         type: String, 
         required: true 
        },
    rating: { 
        type: Number,
         required: true, 
         min: 1, 
         max: 5 },
    userId: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true
         }
  });
const reviews = mongoose.model('reviews',reviewSchema)
module.exports=reviews
