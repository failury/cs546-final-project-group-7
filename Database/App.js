const express = require('express');
const app = express();
const configRoutes = require('./routes');

const {client} = require('./config/mongoConnection')
const users = require('./data/users')
const wallet = require('./data/wallet')
const schedule_payments = require('./data/schedule_payments')
const budget = require('./data/budget')
const transaction = require('./data/transaction')
const category = require('./data/category')
const currency = require('./data/currency')

app.listen(2000, () => {
  console.log('Backend Server is RUNNING on http://localhost:2000');
});

const closeConnection = require('./config/mongoConnection')
console.log('database is working')

app.use(express.json()); 

// var allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// }
// app.use(allowCrossDomain);
// app.use(express.json());
// app.use('/login', (req, res) => {
//   let username = req.body.username;
//   let password = req.body.password;
//   console.log("username: " + username + " password: " + password);
//   if(username == "admin" && password == "password"){
//     res.send({
//       token: 'allowed'
//     });
//     return;
//   }
//   res.send({
//     token: 'wrongusername'
//   });
//   return
// });

// app.use('/signup', (req, res) => {
//   let firstname = req.body.firstname;
//   let lastname = req.body.lastname;
//   let username = req.body.username;
//   let password = req.body.password;
//   console.log("username: " + username + " password: " + password + "firstname: " +firstname + " lastname: "+ lastname);
//   if(username == "admin" && password == "password"){
//     res.send({
//       token: 'allowed'
//     });
//     return;
//   }
//   res.send({
//     token: 'registerfailed'
//   });
//   return
// });
configRoutes(app);

// app.listen(2000, () => {
//   console.log('Backend Server is RUNNING on http://localhost:2000');
// });

