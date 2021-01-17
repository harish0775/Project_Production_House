//require web application framework (Express Js);
const express = require("express");
//require path
const path = require("path");
//use express js after require Express js above line;
const app = express();

//this is a port where output shown on browser : http://localhost:8000/
const port = 8000;

//import mongoose after require and export from config folder,
const db = require("./config/mongoose");

//we set simple templating language(Ejs)
app.set("view engine", "ejs");
app.set("views", "./views");

//we use  routes application responds which is a URI (or path) and a specific HTTP request method..
app.use("/", require("./routes")); 
app.use(express.urlencoded());

//We use assets to make our page Dynamic.
app.use(express.static("assets"));

//require task from model folder.
const Task = require("./models/task");

// creating task  adn storing in the database.
app.post("/create-task", (req, res) => {

  // we pushing describtion,category,date in database
  Task.create(
    {
      task: req.body.description,
      category: req.body.category,
      date: req.body.date,
     
    },
    //if any error while pushing it's show mean error Like:Error in creating a task!
    function (err, tasks) {
      if (err) {
        console.log("Error in creating a task!");
        return;
      }

      // rerender the home page
      console.log("******", tasks);
      return res.redirect("back");
    }
  );
});

// delete task from router
app.post("/delete-task", (req, res) => {
  console.log(req.body);

  let tasks = Object.keys(req.body);

  for (task of tasks) {
    // mongoose database to delete the tasks
    Task.deleteOne({ _id: task }, function (err) {
      if (err) {
        console.log("Error in deleting from database.", err);
        return;
      }
    });
  }
  //complete above code(task) back to same page.
  return res.redirect("back");
});


//this  port were our request listen!
app.listen(port, function (err) {
  if (err) return console.log(`Error: ${err}`);

  console.log(`Server is running on port: ${port}`);
});
