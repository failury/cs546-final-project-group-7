const express = require('express');
const router = express.Router();
const data = require('../data');
const walletdata = data.wallet;
const jwt = require("jsonwebtoken");
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
    let token = req.headers.token;
    let walletInfo = req.body;
    
    try {
        let id = jwt.verify(token, "mySecretKey").id;
        const newWallet = await walletdata.create(
            walletInfo.walletname,
            walletInfo.amount, 
            walletInfo.type,
            id
        );
        res.send('Wallet Created');
    } catch (e) {
        console.log(e);
        res.status(500).json(e.message);
    }

});

module.exports = router;