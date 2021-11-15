const mongoCollections = require('../config/mongoCollections');
const s_paymentCollection = mongoCollections.schedulepayments
let { ObjectId } = require('mongodb');

async function create(spaymentDate, spaymentType, sAmt, sMemo, sLastPostDate ){
    const spayment_collection = await s_paymentCollection();

    let newS_payment = {
        spaymentDate: spaymentDate,
        spaymentType: spaymentType,
        sAmt: sAmt,
        sMemo: sMemo,
        sLastPostDate: sLastPostDate
    }; 
    const insertinfo = await spayment_collection.insertOne(newS_payment)
    const newId = insertinfo.insertedId;
    const new_spayment = await spayment_collection.findOne({ _id: newId });
    const newObjId = ObjectId(new_spayment._id); 
    let x = new_spayment._id
    x = newObjId.toString();
    new_spayment._id=x;

    return(new_spayment)
}

module.exports = {
    create
}
