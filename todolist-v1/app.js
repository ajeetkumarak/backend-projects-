const express = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

// console.log(date)                    // for date.js
// console.log(date.getDay());

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
// mongoose.connect("mongodb://localhost:27017/todolistDB");
mongoose.connect(
  "mongodb+srv://Ajmongo:Ajeetbr2m0372.@cluster0.bsja8s3.mongodb.net/todolistDB"
);
const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item = new Item({
  name: "Complete Homework",
});
// item.save();

const item1 = new Item({
  name: "Hit + button to add a new item.",
});
const item2 = new Item({
  name: "complete your all work.",
});
const item3 = new Item({
  name: "Hit this to delete completed item.",
});

const defaultItems = [item1, item2, item3];
// Item.insertMany(defaultItems, function (err) {
//   if (err) console.log(err);
//   else console.log("Successfully inserted all documents");
// });

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    // console.log(foundItems);

    if (foundItems.length === 0) {
      // console.log(foundItems.length === 0);
      Item.insertMany(defaultItems, function (err) {
        if (err) console.log(err);
        else console.log("Successfully inserted all documents");
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.addList;

  //   console.log(itemName, listName);

  const item = new Item({
    name: itemName,
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  console.log(checkedItemId, listName);

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log(
          `successfully deleted a document of _id: ${checkedItemId}.`
        );
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      function (err, foundList) {
        if (!err) {
          console.log(
            `successfully deleted a document of _id: ${checkedItemId}.`
          );
          res.redirect("/" + listName);
        }
      }
    );
  }

  //   Item.findByIdAndRemove(checkedItemId, function (err) {
  //     if (err) console.log(err);
  //     else console.log(`successfully deleted a document of _id: ${checkedItemId}.`);
  //   });
  //   res.redirect("/");
});

/*
app.post("/", function (req, res) {
  const item = req.body.newItem;
  console.log(item);

  if (req.body.addList === "Work List") {
    workItems.push(item);

    res.redirect("/work");
  } else {
    items.push(item);

    res.redirect("/");
  }
});
*/

// for work list ..

app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
  // console.log(customListName);

  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        // console.log("Doesn't exists");
        // create new list
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        // console.log(list.name);
        list.save();
        res.redirect("/" + customListName);
      } else {
        // console.log("It's exists");
        // show an existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
