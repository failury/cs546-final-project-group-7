const express = require('express');
const router = express.Router();
const data = require('../data');
const transactiondata = data.transaction;

router.get('/transaction', async (req, res) => {
    try {
        let transactionlist = await transactiondata.getAll();
        res.json(transactionlist);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/transaction', async (req,res) => {
    let transInfo = req.body;
    console.log(transInfo)

    try {
        const newTransaction = await transactiondata.create(
            transInfo.payment_Date,
            transInfo.payment_Type, 
            transInfo.Amt,
            transInfo.memo
        );
        res.json(newTransaction);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

module.exports = router;