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

async function getAll(){
    let list = [];
    const wallet_Collection = await walletCollection();
    const walletList = await wallet_Collection.find({}).toArray();

    for(let i=0; i<walletList.length; i++){
        let x = walletList[i]._id
        let y=x.toString();
        walletList[i]._id = y;
    }

    for(let i=0;i<walletList.length;i++){
        let ls = {"name": walletList[i].name, "inputAmt": walletList[i].inputAmt, "balAmt": walletList[i].balAmt};
        list.push(ls);
    }
    return list;
}

async function deletewallet(id) {
    if(!id.trim()){
        throw "String contains white spaces"
    }
    id = id.trim();

    var res = new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    if(res.test(id) === false){
        throw 'Id is not valid'
    }

    if (!id) throw 'Provide an id to remove the data';

    if(typeof id !== 'string') throw 'Id must be a string'

    const wallet_collection = await walletCollection();
    let parsedId = ObjectId(id);

    const walletid = await wallet_collection.findOne({ _id: parsedId});

    const deletionInfo = await wallet_collection.deleteOne({ _id: parsedId});

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete restaurant with id of ${id}`;
    }
    return `${walletid.name} is deleted successfully`;
}

module.exports = {
    create,
    getAll,
    deletewallet
}
