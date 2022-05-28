const mongoose = require('mongoose');
const { Schema } = require("mongoose")

const emptyUserImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'

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
    url:{
        type: String,
        default: emptyUserImage
    },
    passwd:{
        type: String
    },
    email:{
        type: String,
    }
});

const User = mongoose.model('user', UserSchema)
module.exports = User