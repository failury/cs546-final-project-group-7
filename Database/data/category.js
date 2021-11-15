const mongoCollections = require('../config/mongoCollections');
const categoryCollection = mongoCollections.category
let { ObjectId } = require('mongodb');

async function create(name, cPaymentType, categoryColor, icon ){
    const category_collection = await categoryCollection();

    let newCategory = {
        name: name,
        cPaymentType: cPaymentType, 
        categoryColor: categoryColor,
        icon: icon
    }; 

    const insertinfo = await category_collection.insertOne(newCategory)
    const newId = insertinfo.insertedId;
    const new_category = await category_collection.findOne({ _id: newId });
    const newObjId = ObjectId(new_category._id); 
    let x = new_category._id
    x = newObjId.toString(); 
    new_category._id=x;

    return(new_category)
}

module.exports = {
    create
}
