const mongoCollections = require('../config/mongoCollections');
const walletCollection = mongoCollections.wallet
let { ObjectId } = require('mongodb');

async function create(name, inputAmt, balAmt, type){
    const wallet_collection = await walletCollection();

    let newWallet = {
        name: name,
        inputAmt: inputAmt, 
        balAmt: balAmt,
        type : type
    }; 
    const insertinfo = await wallet_collection.insertOne(newWallet)
    const newId = insertinfo.insertedId;
    const new_wallet = await wallet_collection.findOne({ _id: newId });
    const newObjId = ObjectId(new_wallet._id); 
    let x = new_wallet._id
    x = newObjId.toString(); 
    new_wallet._id=x;

    return(new_wallet)
}

module.exports = {
    create
}
