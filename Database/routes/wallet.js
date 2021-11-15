const express = require('express');
const router = express.Router();
const data = require('../data');
const walletdata = data.wallet;

router.get('/', async (req, res) => {
    try {
        console.log("i am from wallet");
        const walletCreate = await walletdata.create();
        res.json(walletCreate);
    }catch (e) {
        res.status(500).send();
    }
});

module.exports = router;