const express = require("express");
const router = express.Router();
const data = require("../data");
const walletdata = data.wallet;
const xss = require("xss");

const jwt = require("jsonwebtoken");
router.get("/wallet", async (req, res) => {
  let token = req.headers.token;
  if (!token) {
    res.status(400).json({ error: "Error" });
    return;
  }

  try {
    let id = jwt.verify(token, "mySecretKey").id;
    let walletlist = await walletdata.getAllWalletByid(id);
    res.json(walletlist);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/wallet", async (req, res) => {
  let token = req.headers.token;
  let walletInfo = req.body;
  let walletname = xss(walletInfo.walletname);
  let amount = xss(walletInfo.amount);
  let type = xss(walletInfo.type);

  if (!token) {
    res.status(400).json({ error: "Error" });
    return;
  }
  if (!walletInfo) {
    res.status(400).json({ error: "You must provide data " });
    return;
  }
  if (!walletname) {
    res.status(400).json({ error: "You must provide wallet name " });
    return;
  }
  if (!amount) {
    res.status(400).json({ error: "You must provide wallet amount " });
    return;
  }

  if(amount === '0' || amount ==='00' || amount === '0.0'){
    res.status(400).json({ error: "Wallet Amount cannot be zero " });
    return;
  }

  if (!type) {
    res.status(400).json({ error: "You must provide wallet type " });
    return;
  }
  if (typeof walletname !== "string") {
    res.status(400).json({ error: "Wallet Name is invalid" });
    return;
  }
  if (typeof amount !== "string") {
    res.status(400).json({ error: "Amount is invalid" });
    return;
  }
  if (typeof type !== "string") {
    res.status(400).json({ error: "Type is invalid" });
    return;
  }
  if (!walletname.trim()) {
    res.status(400).json({ error: "Wallet Name contains white spaces" });
    return;
  }
  walletname = walletname.trim();

  if (!amount.trim()) {
    res.status(400).json({ error: "Amount contains white spaces" });
    return;
  }
  walletInfo.amount = walletInfo.amount.trim();

  if (!type.trim()) {
    res.status(400).json({ error: "Type contains white spaces" });
    return;
  }
  type = type.trim();

  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const newWallet = await walletdata.create(
      xss(walletInfo.walletname),
      xss(walletInfo.amount),
      xss(walletInfo.type),
      id
    );
    res.send("Wallet Created");
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.patch("/wallet", async (req, res) => {
  let token = req.headers.token;
  let walletInfo = req.body;
  let walletname = xss(walletInfo.walletname);
  let amount = xss(walletInfo.amount);
  let type = xss(walletInfo.type);

  if (!token) {
    res.status(400).json({ error: "Error" });
    return;
  }
  if (!walletInfo) {
    res.status(400).json({ error: "You must provide data " });
    return;
  }
  if (!walletname) {
    res.status(400).json({ error: "You must provide wallet name " });
    return;
  }
  if (!amount) {
    res.status(400).json({ error: "You must provide wallet amount " });
    return;
  }
  if (!type) {
    res.status(400).json({ error: "You must provide wallet type " });
    return;
  }
  if (typeof walletname !== "string") {
    res.status(400).json({ error: "Wallet Name is invalid" });
    return;
  }
  if (typeof amount !== "string") {
    res.status(400).json({ error: "Amount is invalid" });
    return;
  }
  if (typeof type !== "string") {
    res.status(400).json({ error: "Type is invalid" });
    return;
  }
  if (!walletname.trim()) {
    res.status(400).json({ error: "Wallet Name contains white spaces" });
    return;
  }
  walletname = walletname.trim();

  if (!amount.trim()) {
    res.status(400).json({ error: "Amount contains white spaces" });
    return;
  }
  amount = amount.trim();

  if (!type.trim()) {
    res.status(400).json({ error: "Type contains white spaces" });
    return;
  }
  type = type.trim();

  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const newWallet = await walletdata.updateWalletByID(
      xss(walletInfo.walletname),
      xss(walletInfo.amount),
      xss(walletInfo.type),
      xss(walletInfo.walletid),
      id
    );
    res.send("Wallet Updated");
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/wallet/delete", async (req, res) => {
  let walletid = xss(req.body.id);
  let token = req.headers.token;

  if (!token) {
    res.status(400).json({ error: "Error" });
    return;
  }
  if (!walletid) {
    res.status(400).json({ error: "You must provide id " });
    return;
  }
  if (typeof walletid !== "string") {
    res.status(400).json({ error: "Id is invalid" });
    return;
  }

  if (!walletid.trim()) {
    res.status(400).json({ error: "Id contains white spaces" });
    return;
  }
  walletid = walletid.trim();

  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const newTransaction = await walletdata.deleteWalletByid(walletid, id);
    res.send("Wallet Deleted");
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
