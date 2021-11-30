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

async function getAll(){
    let list = [];
    const transaction_Collection = await transactionCollection();
    const transactionList = await transaction_Collection.find({}).toArray();

    for(let i=0; i<transactionList.length; i++){
        let x = transactionList[i]._id
        let y=x.toString();
        transactionList[i]._id = y;
    }

    for(let i=0;i<transactionList.length;i++){
        let ls = {"payment_Date": transactionList[i].payment_Date, "payment_Type": transactionList[i].payment_Type, "Amt": transactionList[i].amt, "memo": transactionList[i].memo};
        list.push(ls);
    }
    return list;
}

module.exports = {
    create,
    getAll
}
