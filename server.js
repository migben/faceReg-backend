const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
const knex = require("knex")

const register = require("./controllers/register")

const signin = require("./controllers/signin")

const profile = require("./controllers/profile")

const image = require("./controllers/image")

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "ben",
    password: "",
    database: "smart-eye"
  }
});

const app = express()

app.use(bodyParser.json()) // a must for any app using express.
// https://www.npmjs.com/package/cors
app.use(cors()) // npm pkg - middleware

// endpoints
app.get("/", (req, res) => {
  res.send(db.users)
})

app.post("/signin", (req, res) => {
  signin.handleSigin(req, res, db, bcrypt)
})

// register route
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
})

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db)
})

app.put("/image", (req, res) => {
  image.handleImage(req, res, db)
})

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res)
})

app.listen(3001, () => {
  console.log("running on port 3001")
})
