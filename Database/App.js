const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const configRoutes = require("./routes");
const { client } = require("./config/mongoConnection");
const users = require("./data/users");
const wallet = require("./data/wallet");
const schedule_payments = require("./data/schedule_payments");
const budget = require("./data/budget");
const transaction = require("./data/transaction");
const category = require("./data/category");
const currency = require("./data/currency");

const closeConnection = require("./config/mongoConnection");
app.use(express.json());

app.use(cors());
app.use(express.json());

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, "mySecretKey", {
    expiresIn: "20m",
  });
};

app.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  try {
    var user = await users.checklogin(username, password);
    const accessToken = generateAccessToken(user);
    res.send({
      token: accessToken,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

app.use("/signup", async (req, res) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let username = req.body.username;
  let password = req.body.password;
  let url = req.body.url;
  try {
    let newuser = await users.create(
      firstname,
      lastname,
      username,
      password,
      url
    );
    res.send({ newuser: newuser.username });
  } catch (error) {
    return res.status(400).send("register failed");
  }
});

// app.get('/user', async (req, res) => {
//   let token = req.headers.token;
//   try {
//     let id = await jwt.verify(token, "mySecretKey", (err, result) => {
//       res.json({'userid': result.id});
//     });

//   } catch (error) {
//     res.send('no authenticated');
//   }

// });

configRoutes(app);

app.listen(2000, () => {
  console.log("Backend Server is RUNNING on http://localhost:2000");
});
