const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const mongoose = require('mongoose');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/rv-campgrounds', 
    {useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "console error:"));
db.once("open", () => {
    console.log('Database Connected')
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const price = Math.floor(Math.random () * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '6401688e30870cbcd8760d82', //random user, password default account
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price: price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dj28cdmvu/image/upload/v1678001386/RV-Campgrounds/xzeps1mej5a0im7iz2eo.jpg',
                  filename: 'RV-Campgrounds/xzeps1mej5a0im7iz2eo'
                
                },
                {
                  url: 'https://res.cloudinary.com/dj28cdmvu/image/upload/v1678001386/RV-Campgrounds/eyqajamluj9d4icibcgt.jpg',
                  filename: 'RV-Campgrounds/eyqajamluj9d4icibcgt'
                  
                },
                {
                  url: 'https://res.cloudinary.com/dj28cdmvu/image/upload/v1678001386/RV-Campgrounds/nvdqyqam7qmq6eo7czqm.jpg',
                  filename: 'RV-Campgrounds/nvdqyqam7qmq6eo7czqm'
                 
                },
                {
                  url: 'https://res.cloudinary.com/dj28cdmvu/image/upload/v1678001386/RV-Campgrounds/nsqodenkoe653rlbgl3x.jpg',
                  filename: 'RV-Campgrounds/nsqodenkoe653rlbgl3x'
                  
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})