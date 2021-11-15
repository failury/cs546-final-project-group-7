const usersdata = require('./users');
const walletdata = require('./wallet');
const scheduledata = require('./schedule_payments');
const budgetdata = require('./budget');
const transactiondata = require('./transaction');
const categorydata = require('./category');
const currencydata = require('./currency');

module.exports = {
  users: usersdata,
  wallet: walletdata,
  schedule: scheduledata,
  budget: budgetdata,
  transaction: transactiondata,
  category: categorydata,
  currency: currencydata
};
