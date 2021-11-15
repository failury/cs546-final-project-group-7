const mongoCollections = require('../config/mongoCollections');
const transactionCollection = mongoCollections.transaction
let { ObjectId } = require('mongodb');

async function create(payment_Date, payment_Type, amt, memo){
    const transaction_collection = await transactionCollection();

    let newTransaction = {
        payment_Date: payment_Date,
        payment_Type: payment_Type,
        amt: amt,
        memo: memo
    }; 
    const insertinfo = await transaction_collection.insertOne(newTransaction)
    const newId = insertinfo.insertedId;
    const new_transaction = await transaction_collection.findOne({ _id: newId });
    const newObjId = ObjectId(new_transaction._id); 
    let x = new_transaction._id
    x = newObjId.toString();
    new_transaction._id=x;

    return(new_transaction)
}

module.exports = {
    create
}
