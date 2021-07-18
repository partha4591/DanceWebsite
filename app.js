const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactform', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 80;

//DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone_number: String,
    address: String,
    mail: String
});

const Contact = mongoose.model('Contact', contactSchema);



// FOR EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // for serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));  // set the views directory

//ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res) => {
    let mydata = new Contact(req.body);
    mydata.save().then(() => {
        res.send('This item has been saved to the database');
    }).catch(() => {
        res.status(404).send(`Error${status} not found`);
    });
});

//TO START THE SERVER
app.listen(port, () => {
    console.log(`The app is running successfully at port ${port}`);
});