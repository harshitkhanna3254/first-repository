var express = require('express');
var hbs = require('hbs')
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs')        //key-value pair --- views is the default directory thatexpress uses

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = ` Time : ${now} , Method : ${req.method} , Route : ${req.url}`
    console.log(log);

    fs.appendFile('serverText.log',log + '\n',(err) => {
        if(err)
            console.log("Unable to append to the file")
    })
    next();
})

app.use((req,res,next) => {
    res.render('maintenance.hbs',{ 
        pageTitle : "STOP STOP STOP",
        paragraphTag : "BHAI THAM JAO THORA SA PLEASE"
    })
})


hbs.registerHelper('getCurrentDate', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text1) => {
    return text1.toUpperCase() 
})


app.get('/about', (req,res) => {

res.render('about.hbs',{
    pageTitle : "About Khanna",
})
})

app.get('/home', (req,res) => {

    res.render('home.hbs',{
        pageTitle : "Home Khanna",
    })
})

app.get('/',(req,res) => {
    res.send({
        name: "Harshit Khanna",
        likes: [
            "Football",
            "Rock Music"
        ]
    })
})








app.listen(3000, () => {
    console.log("Listening on port 3000")
})