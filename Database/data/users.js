const mongoCollections = require('../config/mongoCollections');
const usersCollection = mongoCollections.users
let { ObjectId } = require('mongodb');

async function create(firstName, lastName, emailId, hashPassword){
    console.log(firstName)
    const users_collection = await usersCollection();

    let newUsers = {
        firstName: firstName,
        lastName: lastName, 
        emailId: emailId,
        hashPassword : hashPassword
    }; 
    const insertinfo = await users_collection.insertOne(newUsers)
    const newId = insertinfo.insertedId;
    const new_users = await users_collection.findOne({ _id: newId });
    const newObjId = ObjectId(new_users._id); 
    let x = new_users._id
    x = newObjId.toString();
    new_users._id=x;

    return(new_users)
}


async function getAll() {
    // if(arguments.length >0){
    //     throw 'Error: Parameters should not be passed'
    // }
    let list = [];
    const users_Collection = await usersCollection();
    const usersList = await users_Collection.find({}).toArray();

    for(let i=0; i<usersList.length; i++){
        let x = usersList[i]._id
        let y=x.toString();
        usersList[i]._id = y;
    }

    for(let i=0;i<usersList.length;i++){
        let ls = {"firstName": usersList[i].firstName};
        list.push(ls);
    }
    return list;
}

module.exports = {
    create,
    getAll
}
