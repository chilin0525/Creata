const express = require('express');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport')
const cors = require('cors');

dotenv.config()

const app = express();

mongoose
    .connect('mongodb://localhost:27017/creata')
    .then(() => {
        console.log("Suceess to MongoDB")
    })

app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000'
}))
app.use(bodyParser.json())

// setting middleware for passport.js
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/api'))
app.use('/auth', require('./routes/auth'))
app.use('/profile', require('./routes/profile'))
app.use('/message', require('./routes/message'))

app.use(passport.authenticate('session'));

app.get("/",(req, res)=>{
    res.send("congrate!")
})

// start server listen to port number
const PORT = process.env.PORT
app.listen(
    PORT, () => {
        console.log(`The server listen to ${PORT}`)
    }
)
