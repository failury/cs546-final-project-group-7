const mongoCollections = require('../config/mongoCollections');
const s_paymentCollection = mongoCollections.schedule_payments
let { ObjectId } = require('mongodb');

async function create(name, inputAmt, balAmt, type){
    const spayment_collection = await s_paymentCollection();

    let newS_payment = {
        name: name,
        inputAmt: inputAmt,
        balAmt: balAmt,
        tyoe : type
    }; 
    const insertinfo = await spayment_collection.insertOne(newS_payment)
    const newId = insertinfo.insertedId;
    const new_spayment = await spayment_collection.findOne({ _id: newId });
    const newObjId = ObjectId(new_spayment._id); //creates a new object ID
    let x = new_spayment._id
    x = newObjId.toString(); // converts the Object ID to string
    new_spayment._id=x;

    return(new_spayment)
}

module.exports = {
    create
}
