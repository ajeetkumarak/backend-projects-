const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require("lodash")

const homeStartingContent = `If Columbus arrived in the US in 2015, he would likely be very surprised at the changes that have occurred since he first landed in the “New World” in 1492. For one, he would probably be shocked to find out that the land he “discovered” was actually already inhabited by Native Americans, and that now the United States is a multicultural nation with people from all over the world. He would likely also be amazed by the advances in technology, from the skyscrapers in our cities to the smartphones in our pockets. Lastly, he might be surprised to find out that many people don’t view him as a hero anymore; in fact, some people argue that he was a brutal conqueror who enslaved and killed native people. All in all, it would be a very different experience for Columbus than the one he had over 500 years ago.`;
const aboutContent = `We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests. ChatGPT is a sibling model to InstructGPT, which is trained to follow an instruction in a prompt and provide a detailed response.`;
const contactContent = `Christopher Columbus came to the US in 2015 and he was very excited to be here. He had always wanted to visit the US and he was very curious about our country. He was very impressed with our country and he enjoyed his time here.`;

const app = express() 

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

let posts = [];

app.get("/", (req, res) => {

    // res.send("Hello World.")
    res.render("home", {headerContent: homeStartingContent, posts: posts})
})
app.get("/about", (req, res) => {

    res.render("about", {about: aboutContent})
    
})
app.get("/contact", (req, res) => {
    res.render("contact", {contact: contactContent})
})
app.get("/compose", (req, res) => {
    res.render("compose")
})


app.post("/compose", (req, res) => {
    // console.log(req.body.postTitle, req.body.postBlog)

    const blogName = {
        title: req.body.postTitle,
        content : req.body.postBlog
    }
    posts.push(blogName)


    res.redirect("/")
    
})

app.get("/posts/:postName", (req,res) => {
    const requestedTitle = _.lowerCase(req.params.postName);
    // console.log(requestedTitle)

    posts.forEach(function(post) {

        const storedTitle = post.title
        const updatedTitle = _.lowerCase(storedTitle)

        if(updatedTitle === requestedTitle) {
            console.log("Match found.")

            res.render("post", {postTitle: post.title , postContent: post.content})
            // res.redirect("/post")
        }
        else{
            console.log("Match not found.")
        }
    })

})

app.listen(3000, () => {
    console.log("Server is running on port 3000.")
})