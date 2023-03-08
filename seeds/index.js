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
    for (let i = 0; i < 500; i++) {
        const price = Math.floor(Math.random () * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({

          //RANDOM USER ID
            author: '6401688e30870cbcd8760d82', //random user, password default account
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price: price,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
              ]
          },
            images: [
                {
                  url: 'https://res.cloudinary.com/dj28cdmvu/image/upload/v1677996050/RV-Campgrounds/vndxju3hxf44jzxtaulq.jpg',
                  filename: 'RV-Campgrounds/vndxju3hxf44jzxtaulq'
                 
                },
                {
                  url: 'https://res.cloudinary.com/dj28cdmvu/image/upload/v1678238256/RV-Campgrounds/lumdeqyft2xgwusnqj07.jpg',
                  filename: 'RV-Campgrounds/lumdeqyft2xgwusnqj07'
                
                },
                {
                  url: 'https://res.cloudinary.com/dj28cdmvu/image/upload/v1678235837/RV-Campgrounds/x1mryz9mzjbh8akf1aub.jpg',
                  filename: 'RV-Campgrounds/x1mryz9mzjbh8akf1aub'
                  
                }
        
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})