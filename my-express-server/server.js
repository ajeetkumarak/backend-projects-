// console.log("hello men,..")

// var superVillains = require('supervillains');

// var superVillainName = superVillains.random();
// console.log(superVillainName);

var express = require('express')
var app = express()
var port = 3000

// app.get('/', function(request, response){
//     // console.log(request)

//     // response.send(`Hello World, it's me Ajeet.`)
//     response.send(`<h1>Hello World, it's me Ajeet Singh.</h1>`)
// })

app.get('/', function(req, res) {
    res.send(`<h1>Hello World,</h1><h2>Welcome Back..</h2>`)
})

app.get('/contact', function(req, res) {
    res.send(`<h5>Contact me at : </h5><a href="https://www.google.com/"><h2>ajeetsingh@gmail.com</h2></a>`)
})

app.get('/about', function(req, res) {
    res.send(` It's me Ajeet Kumar at NIT Patna currently studing Web Development to  helping target audience with audience's problems. I love beer and code.`)
     
})

app.get('/hobbies', function(req, res) {
    res.send(`<h2>My Hobbies that i loved to do:</h2><ul><li>Coding</li><li>Cricket</li><li>Cooking</li><li>Technology</li></ul>`)
})

app.listen(port, function(){
    console.log(`This Example app listening on port ${port}`)
})