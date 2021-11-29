const express = require('express');
const router = express.Router();
const data = require('../data');
const scheduledata = data.schedule;


router.get('/schedulepayment', async (req, res) => {
    try {
        let schedulelist = await scheduledata.getAll();
        res.json(schedulelist);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/schedulepayment', async (req,res) => {
    let scheduleInfo = req.body;
    try {
        const newSchedule = await scheduledata.create(
            scheduleInfo.spaymentDate,
            scheduleInfo.spaymentType,
            scheduleInfo.sAmt, 
            scheduleInfo.sMemo,
            scheduleInfo.sLastPostDate
        );
        res.json(newSchedule);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;