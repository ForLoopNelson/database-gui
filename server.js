// REQUIRE DEPENDENCIES
const express = require("express")
const app = express()
const MongoClient = require("mongodb").MongoClient
const PORT = 8000
require("dotenv").config()

// DECLARED DB VARIABLES
let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "glassjaw-api"

// CONNECT TO MONGO
MongoClient.connect(dbConnectionStr).then((client) => {
  console.log(`Connected to ${dbName} Database`)
  db = client.db(dbName)
})

// Welcome to MiddleWare
app.set("view engine", "ejs")
app.use(express.static("public")) //look into public folder for files
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
  db.collection("glassjaw")
    .find()
    .toArray()
    .then((data) => {
      let songList = data.map((item) => item.songName)
      console.log(songList)
      res.render("index.ejs", { info: songList })
    })
    .catch((error) => console.log(error))
})

app.post("/api", (req, res) => {
  console.log("Post heard")
  db.collection("glassjaw")
    .insertOne(req.body)
    .then((result) => {
      console.log(result)
      res.redirect("/")
    })
})

app.put("/updateEntry", (req, res) => {
  console.log(req.body)
  Object.keys(req.body).forEach((key) => {
    if (
      req.body[key] === null ||
      req.body[key] === undefined ||
      req.body[key] === ""
    ) {
      delete req.body[key]
    }
  })
  console.log(req.body)
  db.collection("glassjaw")
    .findOneAndUpdate(
      { name: req.body.songName },
      {
        $set: req.body,
      }
    )
    .then((result) => {
      console.log(result)
      res.json("Successful update")
    })
    .catch((error) => console.error(error))
})

app.delete("/deleteEntry", (req, res) => {
  db.collection("glassjaw")
    .deleteOne({ name: req.body.songName })
    .then((result) => {
      console.log(result)
      res.json("Entry Deleted")
    })
    .catch((error) => console.error(error))
})

//Setup localHost on PORT
app.listen(process.env.PORT || PORT, () => {
  console.log("Server is running!")
})
