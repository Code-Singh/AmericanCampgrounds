const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const port = 3000;
const methodOveride = require('method-override')
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError')

const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')

mongoose.connect('mongodb://localhost:27017/american-campgrounds', 
    {useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "console error:"));
db.once("open", () => {
    console.log('Database Connected')
});

app.engine('ejs', ejsMate) // use ejsmate instead of default ejs engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true})) //parse post request
app.use(methodOveride('_method'))
app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

app.get('/', (req, res) => {
    res.render('home')
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
}) 

app.listen(port, ()=> {
    console.log('Serving on Port 3000')
})






