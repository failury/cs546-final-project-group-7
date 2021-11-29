const mongoCollections = require('../config/mongoCollections');
const budgetCollection = mongoCollections.budget
let { ObjectId } = require('mongodb');

async function create(name, amt, budgetType){
    const budget_collection = await budgetCollection();

    let newBudget = { 
        name: name,
        amt: amt,
        budgetType: budgetType
    }; 

    const insertinfo = await budget_collection.insertOne(newBudget)
    const newId = insertinfo.insertedId;
    const new_budget = await budget_collection.findOne({ _id: newId });
    const newObjId = ObjectId(new_budget._id); 
    let x = new_budget._id
    x = newObjId.toString(); 
    new_budget._id=x;

    return(new_budget)
}

async function getAll(){
    let list = [];
    const budget_Collection = await budgetCollection();
    const budgetList = await budget_Collection.find({}).toArray();

    for(let i=0; i<budgetList.length; i++){
        let x = budgetList[i]._id
        let y=x.toString();
        budgetList[i]._id = y;
    }

    for(let i=0;i<budgetList.length;i++){
        let ls = {"budget name": budgetList[i].name, "Amt": budgetList[i].amt, "budget_Type": budgetList[i].budgetType};
        list.push(ls);
    }
    return list;
}

module.exports = {
    create,
    getAll
}
