const mongoose = require('mongoose');
const { campgroundSchema } = require('../schemas');
const Schema = mongoose.Schema; //shortcut 
mongoose.set('strictQuery', true);


const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
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
        await Review.delteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campgroud', CampgroundSchema);