const express = require('express');
const router = express.Router();
const budgets = require('../data');
const budgetData = budgets.budget;
const jwt = require("jsonwebtoken");

router.get('/budget', async (req, res) => {
    let token = req.headers.token;
    try {
        let decoded = jwt.verify(token, "mySecretKey");
        let budget = await budgetData.get(decoded.id);
        res.json(budget);
    } catch (e) {
        res.status(404).json({ error: 'budget not found' });
    }
});

router.post('/budget/add',async (req,res) => {
    let budgetInfo = req.body;
    let token = req.headers.token;
    try {
        let id = jwt.verify(token, "mySecretKey").id;
        let newBudget = await budgetData.create(
            id,
            budgetInfo.budgetname,
            budgetInfo.amount,
            budgetInfo.category,
            budgetInfo.type
        );
        res.json(newBudget);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.patch('/budget/update',async (req,res) => {
    let budgetInfo = req.body;
    let token = req.headers.token;

    try {
        let updatedBudget = await budgetData.update(req.params.id,budgetInfo);
        res.json(updatedBudget);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/budget/delete', async (req, res) => {
    if (!req.params.id) throw 'You must specify an ID to delete';

    let budgetid = req.body.id;
    let token = req.headers.token;

    try {
        let id = jwt.verify(token, "mySecretKey").id;
        await budgetData.delete(budgetid,id);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;