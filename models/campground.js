const mongoose = require('mongoose');
const { campgroundSchema } = require('../schemas');
const Schema = mongoose.Schema; //shortcut 
mongoose.set('strictQuery', true);
const Review = require('./review')

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});
//Cloudinary transformation API for thumbnails for edit page


const opts = { toJSON: { virtuals: true } };


const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: { //GeoJSON return from MAPbox
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
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
}, opts);


//Cluster Map link to camp
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 50)}...</p>`
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