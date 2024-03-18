const mongoose = require("mongoose")
const objId = mongoose.Schema.Types.ObjectId
const userSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    location: {
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    matches: [{
        type: objId
    }],
    wallet: {
        type: objId,
        required: true
    },
    notifications: [{ type: String }]
}, { timestamps: true })

const User = mongoose.model("User", userSchema);
module.exports = User;