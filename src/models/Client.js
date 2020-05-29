const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phonenumber: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    nin: {
        type: String,
        required: true,
        unique: true
    },
    bodastageaddress: {
        type: String,
        required: true
    },
    dateofregistration: {
        type: Date,
        default: Date.now
    },
    registrationstation: {
        type: String,
        required: true
    },
    referralname: {
        type: String
    },
    nextofkin: {
        type: String,
        required: true
    },
    nextofkincontact: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: ["registered", "in-training", "ready-for-activation"],
        default: "registered"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;