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

const closeConnection = require('./config/mongoConnection')
console.log('database is working')

app.use(express.json()); 

configRoutes(app);

app.listen(2000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:2000');
});

