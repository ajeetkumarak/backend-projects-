const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

// console.log(date());

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/blogsDB");

const blogSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'why not name?']
  },
  rating: {
    type: String,
    min: 1,
    max: 10
  },
  review: String
});

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog ({
  name: "Boat headset s10",
  rating: 8,
  review: " Nice look."
});

// blog.save();

const customerSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  proffesion: String,
  blogPost: blogSchema

})

const Customer = mongoose.model("Customer", customerSchema)

const marvel = new Blog({
  name: "fast & furious 8",
  rating: 7,
  review: "Race to win😍"
})
marvel.save();

Customer.updateOne({name: "vin deisel"}, {blogPost: marvel}, function(err){
  if(err) console.log(err)
  else{
    console.log("Successfully updated.")
  }
})

const customer = new Customer({
  name: "James Gun",
  age: 47,
  proffesion: "Film Director",
  blogPost: marvel

})
// customer.save();

const pathaan = new Blog({
  name: "Pathaan",
  rating: 9,
  review: "Blockbustor movie🤩😮"
})
const avatar = new Blog({
  name: "Avtar: The way of water",
  rating: 9,
  review: "Blockbustor movie🤩 wating for next😮"
})
const RRR = new Blog({
  name: "Naatu Naatu",
  rating: 10,
  review: "Golden Globe award🤩😮"
})

// inserting many documents
/*
Blog.insertMany([pathaan, avatar, RRR], function(err){
  if(err) {
    console.log(err)
   } else {
     console.log("Successfully saved all the blogs to blogsDB.")
   }
})
*/

// finding the document

Blog.find(function(err, blogs){
  if(err)  console.log(err)
  else{

    mongoose.connection.close();

    blogs.forEach(function(blog) {
      console.log(blog.name, blog.rating)
    });


    // for(let i = 0; i < blogs.length; i++){
    // // console.log(blogs)
    // console.log(blogs[i].name, blogs[i].rating)
    // // console.log(blogs[i].rating)
    // }
  }
})

// updating document
/*
Blog.updateOne({_id:"63d3a413c9164e007fb9cb12"}, {name: "Chat GPT", rating: 9, review: "Currently running world's Computers"}, function(err){
  if(err) console.log(err)
  else{
    console.log("Successfully updated one dsocument.")
  }
})
*/

// deleting document
/*
Blog.deleteOne({_id:"63d3a413c9164e007fb9cb12"}, function(err){
  if(err) console.log(err)
  else{ console.log("Successfully deleted one document.") }
})
*/


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const port = 3000;

let items = ["Walk everyday", "Read", "Writing"];
const workItems = ["hello work"];

app.get("/", function (req, res) {
 
  let day = date.getDate();
  day = date.getDay();

  res.render("index", { listTitle: day, newItems: items });
});

app.get("/work", (req, res) => {
  res.render("index", { listTitle: "Work List", newItems: workItems });
});
 
app.post("/", function (req, res) {
  console.log(req.body);
  let item = req.body.newItem;

  // items.push(item);

  if (req.body.button === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/contact", function (req, res) {
  res.send(`contact me through this link <a href="." ><i>Ajeet singh</i></a>`);
});
app.get("/about", function (req, res) {
  res.render("about");
});

// app.post("/", (req, res) => {
//   const num1 = Number(req.body.num1);
//   const num2 = Number(req.body.num2);
//   console.log(num1, num2);
//   res.send(`the sum is ${num1 + num2}.`);
// });

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
