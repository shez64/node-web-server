//SERVER.JS

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');




app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});


//app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//});



app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();    
});

//app.get('/', (req, res) => {
//    //res.send('<h1>Hey Express!</h1>');
//    res.send({
//        name: 'Shehzad',
//        likes: [
//            'soccer',
//            'games',
//            'pizza'
//        ]
//    });
//});

//REPLACED BY: 

app.get('/', (req, res) => {
    //res.send('<h1>Hey Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        //currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome!'
    });
});


//app.get('/about', (req, res) => {
//   res.send('About Page'); 
//});

// REPLACED BY:

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page',
       //currentYear: new Date().getFullYear()
   });
});


app.get('/bad', (req, res) => {
   res.send({
       errorMessage: 'Unable to fulfill request'
   });
});




app.listen(3000, () => {
    console.log('Server is running on Port 3000!')
});