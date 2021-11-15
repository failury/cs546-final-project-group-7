const mongoCollections = require('../config/mongoCollections');
const usersCollection = mongoCollections.users
let { ObjectId } = require('mongodb');

async function create(firstName, lastName, emailId, hashPassword){
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

module.exports = {
    create
}
