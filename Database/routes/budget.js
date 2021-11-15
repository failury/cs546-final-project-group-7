const express = require('express');
const router = express.Router();
const data = require('../data');
const budgetdata = data.budget;

router.get('/', async (req, res) => {
    try {
        console.log("i am from budget")
        const budgetCreate = await budgetdata.create();
        res.json(budgetCreate);
    }catch (e) {
        res.status(500).send();
    }
});

module.exports = router;