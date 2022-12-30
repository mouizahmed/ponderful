const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
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

const Option = mongoose.model("options", OptionSchema);
module.exports = Option;