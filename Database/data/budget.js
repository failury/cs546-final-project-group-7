const mongoCollections = require('../config/mongoCollections');
const budgetCollection = mongoCollections.budget;
const users = require('./users');
const categories = require('./category');
let { ObjectId } = require('mongodb');

let exportedMethods = {
    async create(userid,budgetname,amount,category,wallet,type){
        
        if (!userid) throw 'You must provide user id';
        if (!budgetname) throw 'You must provide a name for your budget';
        if (!amount ) throw 'You must provide amount';
        if (!category ) throw 'You must provide category for your budget';
        if (!wallet ) throw 'You must provide wallet for your budget';
        if (!type ) throw 'You must provide what type of budget you want to create';

        if (typeof userid !== 'string') throw 'User id is invalid';
        if (typeof budgetname !== 'string') throw 'Name is invalid';
        if (typeof amount !== 'string') throw 'Amount is invalid';
        if (typeof category !== 'string') throw 'Category is invalid'
        if (typeof wallet !== 'string') throw 'Wallet is invalid'
        if (typeof type !== 'string') throw 'Type of budget is invalid'

        if(!userid.trim()){
            throw "User id contains white spaces"
        }
        userid = userid.trim();

        if(!budgetname.trim()){
            throw "Budget contains white spaces"
        }
        budgetname = budgetname.trim();

        if(!amount.trim()){
            throw "Amount contains white spaces"
        }
        amount = amount.trim();

        if(!category.trim()){
            throw "Category contains white spaces"
        }
        type = type.trim();

        if(!wallet.trim()){
            throw "Wallet contains white spaces"
        }
        wallet = wallet.trim();

        if(!type.trim()){
            throw "Type contains white spaces"
        }
        type = type.trim();

        const budget_collection = await budgetCollection();
        let newBudget = {
            user:new ObjectId(userid),
            budgetname:budgetname,
            amount:amount,
            category:category,
            wallet:wallet,
            type:type
        }

        let List = await this.getBudgetByUserId(userid);
        let budgetlist = [];
        List.forEach(element => {
            budgetlist.push(element.budgetname.toLowerCase());
            
        });
        if (budgetlist.includes(budgetname.toLowerCase())){
            throw 'budgetname existed'
        }

        let insertInfo = await budget_collection.insertOne(newBudget);
        let newId = insertInfo.insertedId;
        let new_budget = await budget_collection.findOne({_id:newId});
        const newObjId = ObjectId(new_budget._id); 
        let x = new_budget._id
        x = newObjId.toString();
        new_budget._id=x;
        return(new_budget);
    },

    async getBudgetByUserId(userid) {

        if (!userid) throw 'You must provide an userid';
        if (typeof userid != 'string') throw "the userid must be a string";
        if (userid.trim().length === 0) throw "the userid is empty spaces";
        userid = userid.trim();

        const budget_collection = await budgetCollection();
        const budgetList = await budget_collection.find({user:ObjectId(userid)}).toArray();
        return budgetList;
    },

    async update(id,userid,budgetInfo) {

        if (!id) throw 'You must provide an id';
        if (typeof id != 'string') throw "the id must be a string";
        if (id.trim().length === 0) throw "the id is empty spaces";
        id = id.trim();

        if (!userid) throw 'You must provide user id';
        if (typeof userid != 'string') throw "the user id must be a string";
        if (userid.trim().length === 0) throw "the user id is empty spaces";
        userid = userid.trim();

        if (!budgetInfo) throw 'You must provide budget info';

        const budget_collection = await budgetCollection();
        const updateBudgetInfo = {
            budgetname: budgetInfo.budgetname,
            amount: budgetInfo.amount,
            category: budgetInfo.category,
            wallet:budgetInfo.wallet,
            type: budgetInfo.type
        }

        let List = await this.getBudgetByUserId(userid);
        let budgetlist = [];
        List.forEach(element => {
            budgetlist.push(element.budgetname.toLowerCase());
            
        });
        if (budgetlist.includes(budgetInfo.budgetname.toLowerCase())){
            throw 'budgetname already existed';
        }

        const updatedInfo = await budget_collection.updateOne(
            {_id:ObjectId(id),user:ObjectId(userid)},
            {$set: updateBudgetInfo}
        );
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not update budget successfully';
        }

        let newBudget = await budget_collection.findOne({user:ObjectId(userid),_id:ObjectId(id)});
        return newBudget;
    },


    async delete(budgetid,userid){
        
        if (!budgetid) throw 'You must provide a budgetid';
        if (typeof budgetid != 'string') throw "the userid must be a string";
        if (budgetid.trim().length === 0) throw "the userid is empty spaces";
        budgetid = budgetid.trim();

        if (!userid) throw 'You must provide an userid';
        if (typeof userid != 'string') throw "the userid must be a string";
        if (userid.trim().length === 0) throw "the userid is empty spaces";
        userid = userid.trim();

        const budget_collection = await budgetCollection();
        let budget = await budget_collection.findOne({user:ObjectId(userid),_id:ObjectId(budgetid)});
        if(budget == null) throw 'Budget does not exist';
        let deleteInfo = await budget_collection.deleteOne({user:ObjectId(userid),_id:ObjectId(budgetid)});
        if (deleteInfo.deletedCount === 0) throw 'Cannot delete this budget';

        return { deleted: true };
    }
}

module.exports = exportedMethods;