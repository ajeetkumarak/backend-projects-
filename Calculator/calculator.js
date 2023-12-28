const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.text())                        // parse all the request into text
// app.use(bodyParser.json())                       //special format we knowv look like javascript objects
app.use(bodyParser.urlencoded({extended: true}))   // use to parse data that comes from an HTML form

const port = 3000;


app.get('/', function(req, res) {
    // res.send(`<h1>Hello Calculator,.</h1>`)
    // console.log(__dirname)
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {

    // console.log(req.body)
    // console.log(req.body.num1)
    // console.log(req.body.num2)

    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;

    res.send(`The Result of Calculation is <h2>` + result + `</h2>`);

});

app.get('/multiply', function(req, res) {
    res.sendFile(__dirname + "index.html")
})
app.post('/multiply', function(req, res) {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 * num2;

    res.send(`The Result of Calculation is <h2>` + result + `</h2>`);
})



app.get('/bmicalculator', function(req, res) {
    res.sendFile(__dirname + "/bmicalculator.html")

});

app.post('/bmicalculator', function(req, res) {

    // var weight = Number(req.body.weight);
    // var height = Number(req.body.height);

    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);

    var bmiResult = weight / (height * height)

    res.send(`The Body Mass Index (BMI) is ` + bmiResult + ` Kg/m<sup>2</sup>.`)
})

app.listen(port, function(){
    console.log(`Server is running or listening on port ${port}.`);
});