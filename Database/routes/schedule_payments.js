const express = require("express");
const router = express.Router();
const data = require("../data");
const scheduledata = data.schedule;
const xss = require("xss");

router.get("/schedulepayment", async (req, res) => {
  try {
    let schedulelist = await scheduledata.getAll();
    res.json(schedulelist);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/schedulepayment", async (req, res) => {
  let scheduleInfo = req.body;
  try {
    const newSchedule = await scheduledata.create(
      xss(scheduleInfo.spaymentDate),
      xss(scheduleInfo.spaymentType),
      xss(scheduleInfo.sAmt),
      xss(scheduleInfo.sMemo),
      xss(scheduleInfo.sLastPostDate)
    );
    res.json(newSchedule);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
