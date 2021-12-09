const express = require("express");
const router = express.Router();
const data = require("../data");
const currencydata = data.currency;
const xss = require("xss");

router.get("/currency", async (req, res) => {
  try {
    let currencylist = await currencydata.getAll();
    res.json(currencylist);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/currency", async (req, res) => {
  let currencyInfo = req.body;
  try {
    const newCurrency = await currencydata.create(
      xss(currencyInfo.name),
      xss(currencyInfo.shortName),
      xss(currencyInfo.symbol),
      xss(currencyInfo.conversion)
    );
    res.json(newCurrency);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
