const express = require("express");
const router = express.Router();
const data = require("../data");
const walletdata = data.wallet;
const xss = require("xss");

const jwt = require("jsonwebtoken");
router.get("/wallet", async (req, res) => {
  let token = req.headers.token;
  if (!token) {
    res.status(400).json({ error: 'Error' });
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

  if (!token) {
    res.status(400).json({ error: 'Error' });
    return;
  }
  if (!walletInfo) {
    res.status(400).json({ error: 'You must provide data ' });
    return;
  }
  if (!walletInfo.walletname) {
    res.status(400).json({ error: 'You must provide wallet name ' });
    return;
  }
  if (!walletInfo.amount) {
    res.status(400).json({ error: 'You must provide wallet amount ' });
    return;
  }
  if (!walletInfo.type) {
    res.status(400).json({ error: 'You must provide wallet type ' });
    return;
  }
  if (typeof walletInfo.walletname !== 'string'){
    res.status(400).json({ error: 'Wallet Name is invalid' });
    return;
  }
  if (typeof walletInfo.amount !== 'string'){
    res.status(400).json({ error: 'Amount is invalid' });
    return;
  }
  if (typeof walletInfo.type !== 'string'){
    res.status(400).json({ error: 'Type is invalid' });
    return;
  }
  if(!walletInfo.walletname.trim()){
    res.status(400).json({ error: 'Wallet Name contains white spaces' });
    return;
  }
  walletInfo.walletname = walletInfo.walletname.trim();

  if(!walletInfo.amount.trim()){
    res.status(400).json({ error: 'Amount contains white spaces' });
    return;
  }
  walletInfo.amount = walletInfo.amount.trim();

  if(!walletInfo.type.trim()){
    res.status(400).json({ error: 'Type contains white spaces' });
    return;
  }
  walletInfo.type = walletInfo.type.trim();

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

  if (!token) {
    res.status(400).json({ error: 'Error' });
    return;
  }
  if (!walletInfo) {
    res.status(400).json({ error: 'You must provide data ' });
    return;
  }
  if (!walletInfo.walletname) {
    res.status(400).json({ error: 'You must provide wallet name ' });
    return;
  }
  if (!walletInfo.amount) {
    res.status(400).json({ error: 'You must provide wallet amount ' });
    return;
  }
  if (!walletInfo.type) {
    res.status(400).json({ error: 'You must provide wallet type ' });
    return;
  }
  if (typeof walletInfo.walletname !== 'string'){
    res.status(400).json({ error: 'Wallet Name is invalid' });
    return;
  }
  if (typeof walletInfo.amount !== 'string'){
    res.status(400).json({ error: 'Amount is invalid' });
    return;
  }
  if (typeof walletInfo.type !== 'string'){
    res.status(400).json({ error: 'Type is invalid' });
    return;
  }
  if(!walletInfo.walletname.trim()){
    res.status(400).json({ error: 'Wallet Name contains white spaces' });
    return;
  }
  walletInfo.walletname = walletInfo.walletname.trim();

  if(!walletInfo.amount.trim()){
    res.status(400).json({ error: 'Amount contains white spaces' });
    return;
  }
  walletInfo.amount = walletInfo.amount.trim();

  if(!walletInfo.type.trim()){
    res.status(400).json({ error: 'Type contains white spaces' });
    return;
  }
  walletInfo.type = walletInfo.type.trim();


  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const newWallet = await walletdata.updateWalletByID(
      xss(walletInfo.name),
      xss(walletInfo.amount),
      xss(walletInfo.type),
      xss(walletInfo._id),
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
    res.status(400).json({ error: 'Error' });
    return;
  }
  if (!walletid) {
    res.status(400).json({ error: 'You must provide id ' });
    return;
  }
  if (typeof walletid !== 'string'){
    res.status(400).json({ error: 'Id is invalid' });
    return;
  }

  if(!walletid.trim()){
    res.status(400).json({ error: 'Id contains white spaces' });
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
