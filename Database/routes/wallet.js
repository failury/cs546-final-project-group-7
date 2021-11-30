const express = require('express');
const router = express.Router();
const data = require('../data');
const walletdata = data.wallet;

router.get('/wallet', async (req, res) => {
    try {
        let walletlist = await walletdata.getAll();
        res.json(walletlist);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/wallet', async (req,res) => {
    let walletInfo = req.body;

    try {
        const newWallet = await walletdata.create(
            walletInfo.name,
            walletInfo.inputAmt, 
            walletInfo.balAmt,
            walletInfo.type
        );
        res.json(newWallet);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

module.exports = router;