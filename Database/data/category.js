// const mongoCollections = require('../config/mongoCollections');
// const categoryCollection = mongoCollections.category
// let { ObjectId } = require('mongodb');

// async function create(name, cPaymentType, categoryColor, icon ){
//     if (!name ) throw 'You must provide a Name for your category';
//     if (!cPaymentType ) throw 'You must provide payment type';
//     if (!categoryColor ) throw 'You must select colour for category ';
//     if (!icon ) throw 'You must provide an icon for category';

//     if (typeof name !== 'string') throw 'Name is invalid'
//     if (typeof cPaymentType !== 'string') throw 'Payment Type is invalid'
//     if (typeof categoryColor !== 'string') throw 'category colour is invalid'
//     //if (typeof icon !== 'string') throw 'icon is invalid'

//     if(!name.trim()){
//         throw "Name contains white spaces"
//     }
//     name = name.trim();

//     if(!cPaymentType.trim()){
//         throw "Payment type contains white spaces"
//     }
//     cPaymentType = cPaymentType.trim();

//     if(!categoryColor.trim()){
//         throw "Category colour contains white spaces"
//     }
//     categoryColor = categoryColor.trim();

//     // if(!icon.trim()){
//     //     throw "Icon contains white spaces"
//     // }
//     // icon = icon.trim();

//     const category_collection = await categoryCollection();

//     let newCategory = {
//         name: name,
//         cPaymentType: cPaymentType, 
//         categoryColor: categoryColor,
//         icon: icon
//     }; 

//     const insertinfo = await category_collection.insertOne(newCategory)
//     const newId = insertinfo.insertedId;
//     const new_category = await category_collection.findOne({ _id: newId });
//     const newObjId = ObjectId(new_category._id); 
//     let x = new_category._id
//     x = newObjId.toString(); 
//     new_category._id=x;

//     return(new_category)
// }

// async function getAll(){
//     let list = [];
//     const category_Collection = await categoryCollection();
//     const categoryList = await category_Collection.find({}).toArray();

//     for(let i=0; i<categoryList.length; i++){
//         let x = categoryList[i]._id
//         let y=x.toString();
//         categoryList[i]._id = y;
//     }

//     for(let i=0;i<categoryList.length;i++){
//         let ls = {"name": categoryList[i].name, "cpaymentType": categoryList[i].cPaymentType, 
//         "categoryColor": categoryList[i].categoryColor, "icon": categoryList[i].icon};
//         list.push(ls);
//     }
//     return list;
// }

// module.exports = {
//     create,
//     getAll
// }

