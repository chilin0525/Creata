const express = require('express');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport')
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");
const User = require('./models/user');

dotenv.config()

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

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
app.use('/company', require('./routes/company'))

app.use(passport.authenticate('session'));

app.get("/",(req, res)=>{
    res.send("congrate!")
})

// start server listen to port number
const PORT = 8000

let socketID2userID = {}

io.on("connection", (socket) => {
    console.log(`new user ${socket.id} connected!`)
  
    socket.on("test", (hellomessage) => {
      console.log(hellomessage)
    })

    // mapping user id with socket id
    socket.on("addUserid", (userid)=>{
        socketID2userID[userid] = socket.id
        console.log(`socket id is ${socket.id} and user id is ${userid}`)
    })

    // send user message flow
    //   sender -> socket server -> other receiver id -> search receiver socket id
    socket.on("sendMessage", async (sendid, receiveid, message)=>{
        console.log(socketID2userID)
        console.log(`${sendid} ${receiveid} ${message}`)
        io.to(socketID2userID[receiveid]).emit("receiveMessage", sendid, receiveid, message)

        const queryUserInfo = await User.find({_id: sendid}).then((userinfo)=>{
            io.to(socketID2userID[receiveid]).emit(
                "recentChatUser", userinfo[0]._id, userinfo[0].name, userinfo[0].url
            )
        });        
    })

    socket.on("disconnect", () => {
        console.log(`user ${socket.id} disconnected!`);
    });
});

httpServer.listen(PORT);