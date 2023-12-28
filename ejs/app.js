const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.set(express.static("public"));

// console.log(path.join(__dirname, 'public'))
// console.log(__dirname + "/public")

app.get("/", (req, res) =>{
  res.render("index")
})
app.listen(3000, () => {
  console.log("Successfully started surver on port 3000.");
})
