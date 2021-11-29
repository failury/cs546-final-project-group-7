const express = require('express');
const router = express.Router();
const data = require('../data');
const categorydata = data.category;

router.get('/category', async (req, res) => {
    try {
        let categorylist = await categorydata.getAll();
        res.json(categorylist);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/category', async (req,res) => {
    let categoryInfo = req.body;
    try {
        const newCategory = await categorydata.create(
            categoryInfo.name,
            categoryInfo.cPaymentType,
            categoryInfo.categoryColor,
            categoryInfo.icon
        );
        res.json(newCategory);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;