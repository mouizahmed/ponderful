const mongoose = require('mongoose');
const crypto = require('crypto');


const SessionSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
});

const OptionSchema = new mongoose.Schema({
    sessionID: {
        type: String,
        required: true,
    },
    optionName: {
        type: String,
        required: true
    },
    optionValue: {
        type: Number,
        default: 0,
        required: false

    }
});




const Session = mongoose.model("sessions", SessionSchema);
const Option = mongoose.model("options", OptionSchema);
module.exports = { Session, Option };
