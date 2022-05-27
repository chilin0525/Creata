const mongoose = require('mongoose');
const { Schema } = require("mongoose")

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Missing username"]
    },
    ID:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    image:{
        tpye: String
    },
    passwd:{
        type: String
    },
    email:{
        type: String
    }
});

const User = mongoose.model('user', UserSchema)
module.exports = User