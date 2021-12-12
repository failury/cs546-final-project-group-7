const mongoCollections = require('../config/mongoCollections');
const walletCollection = mongoCollections.wallet
let { ObjectId } = require('mongodb');

async function create(name, amount, type, userid){
    if (!name ) throw 'You must provide a Name';
    if (!amount ) throw 'You must provide amount';
    if (!type ) throw 'You must provide wallet type';
    if (!userid ) throw 'You must provide user id';

    if (typeof name !== 'string') throw 'Name is invalid'
    if (typeof amount !== 'string') throw 'Amount is invalid'
    if (typeof type !== 'string') throw 'Type is invalid'
    if (typeof userid !== 'string') throw 'User id is invalid'

    if(amount === '0' || amount === '00' || amount === '0.0'){
        throw 'Wallet Amount cannot be zero'
    }

    if(!userid.trim()){
        throw "User id contains white spaces"
    }
    userid = userid.trim();

    if(!name.trim()){
        throw "Name contains white spaces"
    }
    name = name.trim();

    if(!amount.trim()){
        throw "Amount contains white spaces"
    }
    amount = amount.trim();

    if(!type.trim()){
        throw "Type contains white spaces"
    }
    type = type.trim();

    const wallet_collection = await walletCollection();

    let newWallet = {
        user:new ObjectId(userid),
        name: name,
        amount: amount, 
        type : type,
    }; 
    const List = await getAllWalletByid(userid);
    let walletlist = [];
    List.forEach(element => {
        walletlist.push(element.name.toLowerCase());
    });
    if (walletlist.includes(name.toLowerCase())){
        throw 'walletname existed'
    }
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

    if (!userid ) throw 'You must provide user id';
    if (typeof userid !== 'string') throw 'User id is invalid'
    if(!userid.trim()){
        throw "User id contains white spaces"
    }
    userid = userid.trim();

    const wallet_collection = await walletCollection();
    const walletList = await wallet_collection.find({user:ObjectId(userid)}).toArray();
    return walletList;
}

async function deleteWalletByid(walletid,userid) {
    if (!walletid ) throw 'You must provide wallet id';
    if (typeof walletid !== 'string') throw 'Wallet id is invalid'
    if(!walletid.trim()){
        throw "Wallet id contains white spaces"
    }
    walletid = walletid.trim();

    if (!userid ) throw 'You must provide user id';
    if (typeof userid !== 'string') throw 'Userid is invalid'
    if(!userid.trim()){
        throw "User id contains white spaces"
    }
    userid = userid.trim();

    const wallet_collection = await walletCollection();
        const wallet = await wallet_collection.findOne({user:ObjectId(userid),_id:ObjectId(walletid)});
        if(wallet == null) throw 'item does not exist';
        const deletionInfo = await wallet_collection.deleteOne({user:ObjectId(userid),_id:ObjectId(walletid)});
        if (deletionInfo.deletedCount === 0) {
            throw `Could not remove wallet with id of ${walletid}`;
          }
    return {deleted: walletid};
}

// async function searchByName(name, userid) {
// }

async function updateWalletByID(name, amount, type, walletid, userid) {
    if (!name ) throw 'You must provide a Name';
    if (!amount ) throw 'You must provide amount';
    if (!type ) throw 'You must provide wallet type';
    if (!walletid ) throw 'You must provide wallet id';
    if (!userid ) throw 'You must provide user id';
    
    if (typeof name !== 'string') throw 'Name is invalid'
    if (typeof amount !== 'string') throw 'Amount is invalid'
    if (typeof type !== 'string') throw 'Type is invalid'
    if (typeof walletid !== 'string') throw 'Wallet  is invalid'
    if (typeof userid !== 'string') throw 'User id is invalid'

    if(!walletid.trim()){
        throw "Wallet id contains white spaces"
    }
    walletid = walletid.trim();

    if(!userid.trim()){
        throw "User id contains white spaces"
    }
    userid = userid.trim();

    if(!name.trim()){
        throw "Name contains white spaces"
    }
    name = name.trim();

    if(!amount.trim()){
        throw "Amount contains white spaces"
    }
    amount = amount.trim();

    if(!type.trim()){
        throw "Type contains white spaces"
    }
    type = type.trim();

    const wallet_collection = await walletCollection();
    const res = await wallet_collection.findOne({ _id: ObjectId(walletid), user:ObjectId(userid)});
    if (res === null) throw 'the wallet does not exist';
    let updatedWallet = {
        user:new ObjectId(userid),
        name: name,
        amount: amount, 
        type : type,
    }; 
    const List = await wallet_collection.find({}).toArray();
    let walletlist = [];
    List.forEach(element => {
        if(element._id != walletid){
            walletlist.push(element.name.toLowerCase());
        }
    });
    if (walletlist.includes(name.toLowerCase())){
        throw 'walletname existed'
    }
    const updateinfo = await wallet_collection.updateOne({ _id: ObjectId(walletid), user:ObjectId(userid)},{$set:updatedWallet});
    if(updateinfo.modifiedCount ===0){
        throw 'update failed';
    }
    const newWallet = await wallet_collection.findOne({ _id: ObjectId(walletid), user:ObjectId(userid)});
    return(newWallet);
}

// async function getAll(){
//     let list = [];
//     const wallet_Collection = await walletCollection();
//     const walletList = await wallet_Collection.find({}).toArray();

//     for(let i=0; i<walletList.length; i++){
//         let x = walletList[i]._id
//         let y=x.toString();
//         walletList[i]._id = y;
//     }

//     for(let i=0;i<walletList.length;i++){
//         let ls = {"name": walletList[i].name, "inputAmt": walletList[i].inputAmt, "balAmt": walletList[i].balAmt};
//         list.push(ls);
//     }
//     return list;
// }

module.exports = {
    create,
    //getAll,
    getAllWalletByid,
    deleteWalletByid,
    updateWalletByID
}
