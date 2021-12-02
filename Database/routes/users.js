const express = require('express');
const router = express.Router();
const data = require('../data');
const usersdata = data.users;
const jwt = require("jsonwebtoken");

router.get('/user', async (req, res) => {
    let token = req.headers.token;
    try {
        let id = jwt.verify(token, "mySecretKey").id;
        let user = await usersdata.getbyid(id);
        res.json(user);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
// router.get('/users', async (req, res) => {
//     try {
//         let userslist = await usersdata.getAll();
//         res.json(userslist);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

// router.post('/users', async (req, res) => {
//     console.log(req.body)
//     let userInfo = req.body
//     try {
//         console.log("i am from users")
//         // console.log(userInfo);
//         const usersCreate = await usersdata.create(
//             userInfo.firstName,
//             userInfo.lastName,
//             userInfo.emailId,
//             userInfo.hashPassword 
//         );
//         res.json(usersCreate);
//     }catch (e) {
//         console.log(e);
//         res.status(500).send();
//     }
// });

module.exports = router;