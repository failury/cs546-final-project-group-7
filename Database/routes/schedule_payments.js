const express = require('express');
const router = express.Router();
const data = require('../data');
const scheduledata = data.schedule;

router.get('/', async (req, res) => {
    try {
        console.log("i am from schedule payments")
        const scheduleCreate = await scheduledata.create();
        res.json(scheduleCreate);
    }catch (e) {
        res.status(500).send();
    }
});

module.exports = router;