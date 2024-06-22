const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    userId:{
        type: ObjectId,
        required: true
    }
});