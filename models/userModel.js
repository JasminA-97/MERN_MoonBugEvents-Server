const mongoose = require('mongoose')
const userSchema =new mongoose.Schema({
  username:{
        type:String,
        required:true,
        trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required:true,
    trim: true
  },
  profilePic:{
    type:String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const users = mongoose.model('users',userSchema)
module.exports=users
