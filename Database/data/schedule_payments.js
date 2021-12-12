// const mongoCollections = require('../config/mongoCollections');
// const s_paymentCollection = mongoCollections.schedulepayments
// let { ObjectId } = require('mongodb');

// async function create(spaymentDate, spaymentType, sAmt, sMemo, sLastPostDate ){
//     if (!spaymentDate) throw "You must provide payment Date";
//     if (!spaymentType) throw "You must provide payment type";
//     if (!sAmt) throw "You must provide amount";
//     if (!sLastPostDate) throw "You must provide when was the last payment made";

//     if (typeof spaymentDate !== "string") throw "payment date is invalid";
//     if (typeof spaymentType !== "string") throw "payment type is invalid";
//     if (typeof sAmt !== "string") throw "amount is invalid";
//     if (typeof sLastPostDate !== "string") throw "last post date is invalid";

//     if (!spaymentType.trim()) {
//         throw "payment type contains white spaces";
//     }
//     spaymentType = spaymentType.trim();

//     if (!sAmt.trim()) {
//         throw "amount contains white spaces";
//     }
//     sAmt = sAmt.trim();

//     const spayment_collection = await s_paymentCollection();

//     let newS_payment = {
//         spaymentDate: spaymentDate,
//         spaymentType: spaymentType,
//         sAmt: sAmt,
//         sMemo: sMemo,
//         sLastPostDate: sLastPostDate
//     }; 
//     const insertinfo = await spayment_collection.insertOne(newS_payment)
//     const newId = insertinfo.insertedId;
//     const new_spayment = await spayment_collection.findOne({ _id: newId });
//     const newObjId = ObjectId(new_spayment._id); 
//     let x = new_spayment._id
//     x = newObjId.toString();
//     new_spayment._id=x;

//     return(new_spayment)
// }

// async function getAll(){
//     let list = [];
//     const spayment_Collection = await s_paymentCollection();
//     const spaymentList = await spayment_Collection.find({}).toArray();

//     for(let i=0; i<spaymentList.length; i++){
//         let x = spaymentList[i]._id
//         let y=x.toString();
//         spaymentList[i]._id = y;
//     }

//     for(let i=0;i<spaymentList.length;i++){
//         let ls = {"spaymentdate": spaymentList[i].spaymentDate, "spaymentType": spaymentList[i].spaymentType, 
//         "sAmt": spaymentList[i].sAmt, "sMemo": spaymentList[i].sMemo, "sLastPostDate": spaymentList[i].sLastPostDate};
//         list.push(ls);
//     }
//     return list;
// }

// module.exports = {
//     create,
//     getAll
// }
