const express = require("express");
const mysql = require("mysql");
var bodyParser = require("body-parser");
const recipeRouter = require("./routes/recipe");

const app = express();

app.use(bodyParser.json());

app.use("/recipe", recipeRouter);

app.set("view engine", "ejs");

//connection

const db = mysql.createConnection({
  host: "localhost",
  user: "goran",
  password: "123456",
  database: "RecipesDB",
});

//Connect

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`Mysql Connected`);
});

//insert new recipe
app.get("/addrecipe", (req, res) => {
  let sql =
    "SELECT id, name, source, ingredients, preparation, instructions FROM recipes";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    let data = JSON.stringify(result);

    res.render("index", { data: data });
  });
});

app.listen("3000", () => {
  console.log(`Server started on port 3000`);
});
