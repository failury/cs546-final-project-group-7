const express = require("express");
const router = express.Router();
const data = require("../data");
const walletdata = data.wallet;
const xss = require("xss");

const jwt = require("jsonwebtoken");
router.get("/wallet", async (req, res) => {
  let token = req.headers.token;
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
  //TODO: error checking nullchecking
  let walletid = xss(req.body.id);
  let token = req.headers.token;
  try {
    let id = jwt.verify(token, "mySecretKey").id;
    const newTransaction = await walletdata.deleteWalletByid(walletid, id);
    res.send("Wallet Deleted");
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
