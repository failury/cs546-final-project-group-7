const express = require('express');
const router = express.Router();
const data = require('../data');
const transactiondata = data.transaction;

router.get('/', async (req, res) => {
    try {
        console.log("i am from transaction 1")
        const transactionCreate = await transactiondata.create();
        console.log("i am from transaction 2")
        res.json(transactionCreate);
        console.log("i am from transaction 3")
    }catch (e) {
        res.status(500).send();
    }
});

module.exports = router;