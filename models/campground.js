const mongoose = require('mongoose');
const Schema = mongoose.Schema; //shortcut 
mongoose.set('strictQuery', true);


const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
});

module.exports = mongoose.model('Campgroud', CampgroundSchema);