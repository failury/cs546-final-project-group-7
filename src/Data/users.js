// const mongoCollections = require('./mongoCollections');
// const usersCollection = mongoCollections.users
// let { ObjectId } = require('mongodb');


// module.exports = {
//     async create(firstName, lastName, emailId, hashPassword){

//         //If empty or not provided
//         // if (!name ) throw 'You must provide a Name for your restaurant';
//         // if (!location ) throw 'You must provide a Location for your restaurant';
//         // if (!phoneNumber ) throw 'You must provide a Phone Number for your restaurant';
//         // if (!website ) throw 'You must provide a Website for your restaurant';
//         // if (!priceRange ) throw 'You must provide a Price range for your restaurant';
//         // if (!cuisines ) throw 'You must provide a Cuisines for your restaurant';
//         // if (!serviceOptions ) throw 'You must provide a Service Options for your restaurant';

//         // if (typeof name !== 'string') throw 'Name is invalid'
//         // if (typeof location !== 'string') throw 'Location is invalid'
//         // if (typeof phoneNumber !== 'string') throw 'Phone Number is invalid'
//         // if (typeof website !== 'string') throw 'Website is invalid'
//         // if (typeof priceRange !== 'string') throw 'Price range is invalid'
//         // if(Array.isArray(cuisines) === false){
//         //     throw "Cuisines must be passed in [] brackets";
//         // }
//         // if(Array.isArray(serviceOptions) == true || typeof serviceOptions !== 'object'){
//         //     throw "Service Options must be passed in {} brackets "  
//         // }

//         // if(!name.trim()){
//         //     throw "String contains white spaces"
//         // }
//         // name = name.trim();

//         // if(!location.trim()){
//         //     throw "String contains white spaces" 
//         // }
//         // location = location.trim();

//         // if(!phoneNumber.trim()){
//         //     throw "String contains white spaces"
//         // }
//         // phoneNumber = phoneNumber.trim();

//         // if(!website.trim()){
//         //     throw "String contains white spaces"
//         // }
//         // website = website.trim();

//         // if(!priceRange.trim()){
//         //     throw "String contains white spaces"
//         // }
//         // priceRange = priceRange.trim();

//         // if(!cuisines.length) throw 'cuisine is empty.'
//         // for(let i = 0; i<cuisines.length; i++){
//         //     if(typeof cuisines[i] != 'string') {
//         //         throw 'Cuisines options must be in a string'
//         //     }
//         // }
//         // for(let i =0; i<cuisines.length; i++){
//         //     if(typeof cuisines[i] === 'string'){
//         //         if(!cuisines[i].trim()){
//         //             throw "String contains white spaces"
//         //         }
//         //         cuisines[i] = cuisines[i].trim();
//         //     }
//         // }

//         // if(Object.keys(serviceOptions).length == 0){
//         //     throw "Object is empty"
//         // }
//         // for(let i=0; i<Object.keys(serviceOptions).length; i++){
//         //     if(Object.keys(serviceOptions)[i] !== 'dineIn' && Object.keys(serviceOptions)[i] !== 'takeOut' && Object.keys(serviceOptions)[i] !== 'delivery'){
//         //         throw 'Service Options must be in sequence of dineIn, takeOut, delivery'
//         //     }
//         // }

//         // if(Object.keys(serviceOptions).length !== 3){
//         //     throw  'All service options must be provided in the sequence of dineIn, takeOut, delivery'
//         // }

//         // for(let i =0; i<Object.values(serviceOptions).length; i++){
//         //     if((typeof Object.values(serviceOptions)[i]) !== 'boolean' || (typeof Object.values(serviceOptions)[i]) !== 'boolean'){
//         //         throw 'Service Options must either be true or false'
//         //     }

//         // }
//         // for(let i=0; i<Object.keys(serviceOptions).length; i++){
//         //     if((Object.keys(serviceOptions)[i]) === 'null' ){
//         //         throw 'Service options cannot be null'
//         //     }
            
//         // }

//         // // phonenumber format
//         // let reg = new RegExp(/^\d{3}-\d{3}-\d{4}$/)
//         // if(reg.test(phoneNumber) === false){
//         //     throw 'Phone number format must be XXX-XXX-XXXX'
//         // }

//         // // website format
//         // let regs = new RegExp(/^(http?:\/\/)(www\.)[-a-zA-Z0-9]{5,}\.com$/g)
//         // if(regs.test(website) === false){
//         //     throw 'Invalid url'
//         // }

//         // //price range $$ format
//         // for(i in priceRange){
//         //     if(priceRange[i] !== '$'){
//         //         throw 'Must be in $ format'
//         //     }
//         // }
//         // if(priceRange.length < 1 || priceRange.length >=5){
//         //     throw 'The Price Range must be between $ to $$$$'
//         // }


//         const users_collection = await usersCollection();

//         let newUsers = {
//             firstName: firstName,
//             lastName: lastName,
//             emailId: emailId,
//             hashPassword : hashPassword
//         }; 

//         const insertinfo = await users_collection.insertOne(newUsers)
//         const newId = insertinfo.insertedId;
//         const new_users = await users_collection.findOne({ _id: newId });
//         const newObjId = ObjectId(new_users._id); //creates a new object ID
//         let x = new_users._id
//         x = newObjId.toString(); // converts the Object ID to string
//         new_users._id=x;

//         return(new_users)
//     },

// }