const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const PORT = process.env.PORT || 3000;

const homeContent = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis earum veritatis impedit et architecto, quas ipsam minima, officiis rem quisquam animi magni libero id numquam amet doloribus consequuntur! Velit, iusto! Placeat cupiditate commodi eligendi modi!`;
const aboutContent =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis earum veritatis impedit et architecto, quas ipsam minima, officiis rem quisquam animi magni libero id numquam amet doloribus consequuntur! Velit, iusto! Placeat cupiditate commodi eligendi modi!";
const contactContent = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis earum veritatis impedit et architecto, quas ipsam minima, officiis rem quisquam animi magni libero id numquam amet doloribus consequuntur! Velit, iusto! Placeat cupiditate commodi eligendi modi!`;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", { content: homeContent, button: "CREATE YOUR BLOG" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { content: contactContent, button: "CONTACT HERE" });
});
app.get("/about", (req, res) => {
  res.render("about", { about: aboutContent, button: "ABOUT BLOGGER" });
});
app.get("/blog", (req, res) => {
  res.render("blog", {
    blogContent: "My Blog Here right away..........",
    button: "CREATE YOUR BLOG",
  });
});

app.listen(PORT, () => {
  console.log(`server successfully started on port ${PORT}`);
});
