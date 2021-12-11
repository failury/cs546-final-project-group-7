const express = require("express");
const router = express.Router();
const data = require("../data");
const usersdata = data.users;
const jwt = require("jsonwebtoken");
const xss = require("xss");

router.get("/user", async (req, res) => {
  let token = req.headers.token;
  try {
    let id = jwt.verify(token, "mySecretKey").id;
    let user = await usersdata.getbyid(id);
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
});

router.patch("/user", async (req, res) => {
  let token = req.headers.token;
  
  if (!token) {
    res.status(400).json({ error: 'Error' });
    return;
  }
  if (!req.body) {
    res.status(400).json({ error: 'You must provide data ' });
    return;
  }

  let firstname = xss(req.body.firstname);
  let lastname = xss(req.body.lastname);
  let username = xss(req.body.username);
  let email = xss(req.body.email);
  let password = xss(req.body.password);
  let url = xss(req.body.url);

  if (!firstname) {
    res.status(400).json({ error: 'You must provide first name' });
    return;
  }
  if (!lastname) {
    res.status(400).json({ error: 'You must provide last name' });
    return;
  }
  if (!username) {
    res.status(400).json({ error: 'You must provide username' });
    return;
  }
  if (!email) {
    res.status(400).json({ error: 'You must provide email' });
    return;
  }

  if (!password) {
    res.status(400).json({ error: 'You must provide password' });
    return;
  }

  try {
    let id = jwt.verify(token, "mySecretKey").id;
    let user = await usersdata.update(
      firstname,
      lastname,
      username,
      email,
      password,
      url,
      id
    );
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
});
module.exports = router;
