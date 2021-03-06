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
const xss = require("xss");

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
  let username = xss(req.body.username);
  let password = xss(req.body.password);
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
  let firstname = xss(req.body.firstname);
  let lastname = xss(req.body.lastname);
  let username = xss(req.body.username);
  let email = xss(req.body.email);
  let password = xss(req.body.password);
  let url = xss(req.body.url);
  try {
    let newuser = await users.create(
      firstname,
      lastname,
      username,
      email,
      password,
      url
    );

    res.send({ newuser: newuser.username });
  } catch (error) {
    return res.status(400).json(error);
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
