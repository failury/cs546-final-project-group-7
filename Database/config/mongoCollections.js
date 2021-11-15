const dbConnection = require('./mongoConnection');

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection(); 
      _col = await db.collection(collection);
    } 

    return _col;
  };
};

module.exports = {
  users: getCollectionFn('users'),
  wallet: getCollectionFn('wallet'),
  schedulepayments: getCollectionFn('schedule_payments'),
  budget: getCollectionFn('budget'),
  transaction: getCollectionFn('transaction'),
  category: getCollectionFn('category'),
  currency: getCollectionFn('currency') 

};
