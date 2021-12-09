const express = require("express");
const router = express.Router();
const data = require("../data");
const transactiondata = data.transaction;
const jwt = require("jsonwebtoken");
const xss = require("xss");

router.get("/transaction", async (req, res) => {
  let token = req.headers.token;
  try {
    let decoded = jwt.verify(token, "mySecretKey");
    let transactions = await transactiondata.getAllTransactionByid(decoded.id);
    res.json(transactions);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/transaction/add", async (req, res) => {
  //TODO: error checking nullchecking
  let transInfo = req.body;
  let token = req.headers.token;
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
  //TODO: error checking nullchecking
  let transactionid = xss(req.body.id);
  let token = req.headers.token;
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
  let transactionid = xss(req.body.id);
  let token = req.headers.token;
  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const dateList = transactiondata.searchByDate(
      xss(req.body.payment_Date),
      id
    );
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.post("/transaction/mail", async (req, res) => {
  // let transactionid = xss(req.body.id);
  let token = req.headers.token;
  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const statement = transactiondata.getAllTransactionToEmail(id);
    res.send("Your transaction statement mailed successfully!");
  } catch (e) {
    return res.status(400).json(e);
  }
});

module.exports = router;
