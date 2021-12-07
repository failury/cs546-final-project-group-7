const express = require("express");
const router = express.Router();
const data = require("../data");
const transactiondata = data.transaction;
const jwt = require("jsonwebtoken");
router.get("/transaction", async (req, res) => {
  let token = req.headers.token;
  try {
    let decoded = jwt.verify(token, "mySecretKey");
    let transactions = await transactiondata.getAllTransactionByid(decoded.id);
    res.json(transactions);
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
});

router.post("/transaction/add", async (req, res) => {
  //TODO: error checking nullchecking
  let transInfo = req.body;
  let token = req.headers.token;
  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const newTransaction = await transactiondata.create(
      transInfo.payment_Date,
      transInfo.payment_Type,
      transInfo.category,
      transInfo.wallet,
      transInfo.Amt,
      transInfo.memo,
      id
    );
    res.send("Transaction Created");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.post("/transaction/delete", async (req, res) => {
  //TODO: error checking nullchecking
  let transactionid = req.body.id;
  let token = req.headers.token;
  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const newTransaction = await transactiondata.deleteTransactionByid(
      transactionid,
      id
    );
    res.send("Transaction Deleted");
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.post("/transaction/search", async (req, res) => {
  let transactionid = req.body.id;
  let token = req.headers.token;
  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const dateList = transactiondata.searchByDate(req.body.payment_Date, id);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
