require('dotenv').config()
require('./db/connection')
const express = require('express');
const cors = require('cors');
const router = require('./routes/router')

const moonbugServer = express();

moonbugServer.use(cors());
moonbugServer.use(express.json());
moonbugServer.use(router) 
moonbugServer.use('/uploads', express.static('./uploads'));


const PORT = 3000 || process.env.PORT

moonbugServer.listen(PORT,()=>{
    console.log(`moonbugServer started at port : ${PORT}`);
})

moonbugServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style='color:red;'>MoonBug server started and waiting for client request</h1>`)
})

