const { text } = require("body-parser");
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    number: {
        type: Number,
        required: true,
        trim: true
    },
    image: {
        type: Buffer,
        required: true
    }
});


const imageModel = mongoose.model("Ragav", imageSchema);
module.exports = imageModel;