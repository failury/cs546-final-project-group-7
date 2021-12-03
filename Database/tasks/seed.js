const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const categories = data.category;
const budgets = data.budget;

async function main() {
    const db = await dbConnection.connectToDb();
    await db.dropDatabase();

    await users.create('fname1','lname1','user1','123456');
    await users.create('fname2','lname2','user2','147258');

    await categories.create('electronic devices','card1','blue','1');

    console.log('Done seeding database');
    await dbConnection.closeConnection();
}

main();