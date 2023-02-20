const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema; //shortcut 
mongoose.set('strictQuery', true);


const ReviewSchema = new Schema({
    body: String,
    rating: Number,
});

module.exports = mongoose.model('Review', ReviewSchema);