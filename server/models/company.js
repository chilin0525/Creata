const mongoose = require('mongoose');
const { Schema } = require("mongoose")

const CompanySchema = new Schema({
    authorID:{
        type: String,
    },
    authorName:{
        type: String,
    },
    authorUrl:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: [true, "Missing username"]
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    address:{
        type: String,
    },
    website:{
        type: String,
    },
    about:{
        type: String,
    },
    service:{
        type: String,
    },
    benefits:{
        type: String
    },
    compensation:{
        type: Array
    },
    legal:{
        type: Boolean,
        default: true
    }
});

const Company = mongoose.model('company', CompanySchema)
module.exports = Company