const express = require("express");
const router = express.Router();
const data = require("../data");
const transactiondata = data.transaction;
const jwt = require("jsonwebtoken");
const xss = require("xss");

const alert = require("alert");
router.get("/transaction", async (req, res) => {
  let token = req.headers.token;

  if (!token) {
    res.status(400).json({ error: "Error" });
    return;
  }

  try {
    let decoded = jwt.verify(token, "mySecretKey");
    let transactions = await transactiondata.getAllTransactionByid(decoded.id);
    res.json(transactions);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/transaction/add", async (req, res) => {
  let transInfo = req.body;
  let token = req.headers.token;
  let payment_Date = xss(transInfo.payment_Date);
  let payment_Type = xss(transInfo.payment_Type);
  let category = xss(transInfo.category);
  let wallet = xss(transInfo.wallet);
  let Amt = xss(transInfo.Amt);
  if (!token) {
    res.status(400).json({ error: "Error" });
    return;
  }

  if (!transInfo) {
    res.status(400).json({ error: "You must provide data" });
    return;
  }

  if (!payment_Date) {
    res.status(400).json({ error: "You must provide date" });
    return;
  }

  if (!payment_Type) {
    res.status(400).json({ error: "You must provide payment type" });
    return;
  }

  if (!category) {
    res.status(400).json({ error: "You must provide category" });
    return;
  }

  if (!wallet) {
    res.status(400).json({ error: "You must provide wallet" });
    return;
  }

  if (!Amt) {
    res.status(400).json({ error: "You must provide amount" });
    return;
  }

  if (typeof payment_Date !== "string") {
    res.status(400).json({ error: "Date is invalid" });
    return;
  }

  if (typeof payment_Type !== "string") {
    res.status(400).json({ error: "Payment Type is invalid" });
    return;
  }

  if (typeof category !== "string") {
    res.status(400).json({ error: "category is invalid" });
    return;
  }

  if (typeof wallet !== "string") {
    res.status(400).json({ error: "Wallet is invalid" });
    return;
  }

  if (typeof Amt !== "string") {
    res.status(400).json({ error: "Amount is invalid" });
    return;
  }

  if (!payment_Date.trim()) {
    res.status(400).json({ error: "date contains white spaces" });
    return;
  }
  payment_Date = payment_Date.trim();

  if (!payment_Type.trim()) {
    res.status(400).json({ error: "payment type contains white spaces" });
    return;
  }
  payment_Type = payment_Type.trim();

  if (!category.trim()) {
    res.status(400).json({ error: "Category contains white spaces" });
    return;
  }
  category = category.trim();

  if (!wallet.trim()) {
    res.status(400).json({ error: "Wallet contains white spaces" });
    return;
  }
  wallet = wallet.trim();

  if (!Amt.trim()) {
    res.status(400).json({ error: "amount contains white spaces" });
    return;
  }
  Amt = Amt.trim();

  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const newTransaction = await transactiondata.create(
      xss(transInfo.payment_Date),
      xss(transInfo.payment_Type),
      xss(transInfo.category),
      xss(transInfo.wallet),
      xss(transInfo.Amt),
      xss(transInfo.memo),
      id
    );
    res.json({ ok: "Transaction Created" });
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.post("/transaction/delete", async (req, res) => {
  let transactionid = xss(req.body.id);
  let token = req.headers.token;

  if (!token) {
    res.status(400).json({ error: "Error" });
    return;
  }

  if (!transactionid) {
    res.status(400).json({ error: "You must provide id" });
    return;
  }

  if (typeof transactionid !== "string") {
    res.status(400).json({ error: "Id is invalid" });
    return;
  }

  if (!transactionid.trim()) {
    res.status(400).json({ error: "id contains white spaces" });
    return;
  }
  transactionid = transactionid.trim();

  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const newTransaction = await transactiondata.deleteTransactionByid(
      transactionid,
      id
    );
    res.send("Transaction Deleted");
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.post("/transaction/search", async (req, res) => {
  //let transactionid = xss(req.body.id);
  let payment_Date = xss(req.body.payment_Date);

  let token = req.headers.token;

  if (!token) {
    res.status(400).json({ error: "error" });
    return;
  }

  if (!payment_Date) {
    res.status(400).json({ error: "You must provide date" });
    return;
  }

  if (typeof payment_Date !== "string") {
    res.status(400).json({ error: "Date is invalid" });
    return;
  }

  if (!payment_Date.trim()) {
    res.status(400).json({ error: "Date contains white spaces" });
    return;
  }
  payment_Date = payment_Date.trim();

  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const dateList = transactiondata.searchByDate(payment_Date, id);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.post("/transaction/mail", async (req, res) => {
  // let transactionid = xss(req.body.id);
  let token = req.headers.token;

  if (!token) {
    res.status(400).json({ error: "error" });
    return;
  }

  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const statement = transactiondata.getAllTransactionToEmail(id);
    //console.log("harsh");
    // res.jsonp({ success: true });
    alert("Your transaction statement mailed successfully!");
  } catch (e) {
    return res.status(400).json(e);
  }
});

module.exports = router;
