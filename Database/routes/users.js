const express = require('express');
const router = express.Router();
const data = require('../data');
const usersdata = data.users;

router.get('/', async (req, res) => {
    try {
        console.log("i am from users")
        const usersCreate = await usersdata.create();
        res.json(usersCreate);
    }catch (e) {
        res.status(500).send();
    }
});

module.exports = router;