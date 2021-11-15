const express = require('express');
const router = express.Router();
const data = require('../data');
const currencydata = data.currency;

router.get('/', async (req, res) => {
    try {
        console.log("i am from currency")
        const currencyCreate = await currencydata.create();
        res.json(currencyCreate);
    }catch (e) {
        res.status(500).send();
    }
});

module.exports = router;