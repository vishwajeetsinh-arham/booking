const mongoose = require('mongoose')
const Schema = mongoose.Schema


const slotSchema = new Schema({
    slot: Date,
    timestamp: Number,
})


module.exports =  mongoose.model('Slot', slotSchema)