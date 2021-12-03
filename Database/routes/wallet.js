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

router.get('/wallet/:id', async (req, res) => {
    
    try {
        const walletid = await walletdata.getwallet(req.params.id);
        res.json(walletid);
    }catch (error) {
        res.status(404).json({ message: 'wallet not found!' });
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

router.delete('/wallet/:id', async (req, res) => {
    
    // try {
    //     await restdata.get(req.params.id);
    // } catch (e) {
    //     res.status(404).json({ error: 'Restaurant not found' });
    //     return;
    // }
    try {
      const deletewallet = await walletdata.deletewallet(req.params.id);
      res.json(deletewallet);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


module.exports = router;

