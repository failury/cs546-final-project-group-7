// const postRoutes = require('./posts');
// const userRoutes = require('./users');
const express = require('express')
const router = express.Router()
const user = require('../data/user')
const constructorMethod = (app) => {
//   app.use('/posts', postRoutes);
//   app.use('/users', userRoutes);

  
  router.get('/',async(req,res)=>{
    
    try {
      console.log("hi")
       await user.create("2","2","2","2")
      res.send("ok");
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  app.use('*', (req, res) => {
    console.log("hi")
    user.create("2","2","2","2")
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;