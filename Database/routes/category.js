const express = require('express');
const router = express.Router();
const data = require('../data');
const categorydata = data.category;

router.get('/', async (req, res) => {
    try {
        console.log("i am from category")
        const categoryCreate = await categorydata.create();
        res.json(categoryCreate);
    }catch (e) {
        res.status(500).send();
    }   
});

module.exports = router;