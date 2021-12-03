const mongoCollections = require('../config/mongoCollections');
const walletCollection = mongoCollections.wallet
let { ObjectId } = require('mongodb');

async function create(name, inputAmt, balAmt, type,userid){
    const wallet_collection = await walletCollection();

    let newWallet = {
        user:new ObjectId(userid),
        name: name,
        inputAmt: inputAmt, 
        balAmt: balAmt,
        type : type,
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


async function getAllWalletByid(userid) {
    //TODO: error check for userid
    const wallet_collection = await walletCollection();
    const walletList = await wallet_collection.find({user:ObjectId(userid)}).toArray();
    return walletList;
}

async function deleteWalletByid(walletid,userid) {
    //TODO: error check for userid
    
    const wallet_collection = await walletCollection();
        const wallet = await wallet_collection.findOne({user:ObjectId(userid),_id:ObjectId(walletid)});
        if(wallet == null) throw 'item does not exist';
        const deletionInfo = await wallet_collection.deleteOne({user:ObjectId(userid),_id:ObjectId(walletid)});
        if (deletionInfo.deletedCount === 0) {
            throw 'Could not remove wallet with id of ${walletid}';
          }
    return {deleted: walletid};
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

module.exports = {
    create,
    getAll,
    getAllWalletByid,
    deleteWalletByid
}
