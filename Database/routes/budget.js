const express = require('express');
const router = express.Router();
const data = require('../data');
const budgetdata = data.budget;

router.get('/budget', async (req, res) => {
    try {
        let budgetlist = await budgetdata.getAll();
        res.json(budgetlist);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/budget', async (req,res) => {
    let budgetInfo = req.body;

    try {
        const newBudget = await budgetdata.create(
            budgetInfo.name,
            budgetInfo.amt,
            budgetInfo.budgetType, 
        );
        res.json(newBudget);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

module.exports = router;