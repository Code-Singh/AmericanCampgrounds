const mongoose = require('mongoose');
const { campgroundSchema } = require('../schemas');
const Schema = mongoose.Schema; //shortcut 
mongoose.set('strictQuery', true);
const Review = require('./review')

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User' //associate user with camp
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review' // Refers to the Review model
        }
    ]
});

//For deleting matching reviews
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campgroud', CampgroundSchema);