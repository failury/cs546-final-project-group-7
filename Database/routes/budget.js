const express = require('express');
const router = express.Router();
const budgets = require('../data');
const budgetData = budgets.budget;

router.get('/budget/:id', async (req, res) => {
    try {
        let budget = await budgetData.get(req.params.id);
        res.json(budget);
    } catch (e) {
        res.status(404).json({ error: 'budget not found' });
    }
});

router.post('/budget',async (req,res) => {
    let budgetInfo = req.body;
    try {
        let newBudget = await budgetData.create(
            budgetInfo.username,
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

router.patch('/budget/:id',async (req,res) => {
    let budgetInfo = req.body;

    try {
        await budgetData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Budget not found' });
        return;
    }

    try {
        let updatedBudget = await budgetData.update(req.params.id,budgetInfo);
        res.json(updatedBudget);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.delete('/budget/:id', async (req, res) => {
    if (!req.params.id) throw 'You must specify an ID to delete';
    try {
        await budgetData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Budget not found' });
        return;
    }

    try {
        await budgetData.delete(req.params.id);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;