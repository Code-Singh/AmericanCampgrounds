const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const port = 3000;
const Campground = require('./models/campground');
const { urlencoded } = require('express');


mongoose.connect('mongodb://localhost:27017/american-campgrounds', 
    {useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "console error:"));
db.once("open", () => {
    console.log('Database Connected')
});

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true})) //parse post request

app.get('/', (req,res) => {
    res.render('home')
})


app.get('/campgrounds', async(req,res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
}
)

app.get('/campgrounds/new', (req,res) => { //place before :id to avoid / endpoint
    res.render('campgrounds/new')
})

app.post('/campgrounds', async (req,res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id', async(req,res) =>{
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground})
})




app.listen(port, ()=> {
    console.log('Serving on Port 3000')
})






