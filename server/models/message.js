const mongoose = require('mongoose');
const { Schema } = require("mongoose")

const MessageSchema = new Schema({
    sender_ID:{
        type: String,
        required: [true, "Missing sender ID"]
    },
    receiver_ID:{
        type: String,
        required: [true, "Missing receiver ID"]
    },
    message:{
        type: String,
        required: [true, "Message"]
    },
    date:{
        type: Date,
        default: Date.now
    },
});

const Message = mongoose.model('message', MessageSchema)
module.exports = Message