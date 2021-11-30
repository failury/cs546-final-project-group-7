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

async function getAll(){
    let list = [];
    const category_Collection = await categoryCollection();
    const categoryList = await category_Collection.find({}).toArray();

    for(let i=0; i<categoryList.length; i++){
        let x = categoryList[i]._id
        let y=x.toString();
        categoryList[i]._id = y;
    }

    for(let i=0;i<categoryList.length;i++){
        let ls = {"name": categoryList[i].name, "cpaymentType": categoryList[i].cpaymentType, 
        "categoryColor": categoryList[i].categoryColor, "icon": categoryList[i].icon};
        list.push(ls);
    }
    return list;
}

module.exports = {
    create,
    getAll
}

