const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const categories = data.category;
const budgets = data.budget;

async function main() {
    const db = await dbConnection.connectToDb();
    //await db.dropDatabase();

    let updateInfo = {
        budgetname: 'Gaming Monitor',      
        category: 'Electronic Devices',    
        amount: '400',
        wallet: 'Card2',
        type: 'Monthly'
    };
    await budgets.update('61ae2557396b8a937ff6ffc6','61ae2557396b8a937ff6ffc3',updateInfo);

    console.log('Done seeding database');
    await dbConnection.closeConnection();
}

main();