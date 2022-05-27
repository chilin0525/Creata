const express = require('express');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport')

dotenv.config()

const app = express();

mongoose
    .connect('mongodb://localhost:27017/creata')
    .then(() => {
        console.log("Suceess to MongoDB")
    })

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

app.use(passport.authenticate('session'));

app.get("/",(req,res)=>{
    res.sendFile("/home/chilin/Creata/client/test.html")
})

// start server listen to port number
const PORT = process.env.PORT
app.listen(
    PORT, () => {
        console.log(`The server listen to ${PORT}`)
    }
)
