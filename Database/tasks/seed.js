const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const categories = data.category;
const budgets = data.budget;

async function main() {
    const db = await dbConnection.connectToDb();
    await db.dropDatabase();

    let user1 = await users.create('fname1','lname1','user1','01020304',"");
    let user2 = await users.create('fname2','lname2','user2','47484940',"");

    await categories.create('electronic devices','card1','blue','1');

    id1 = user1._id.toString();
    id2 = user2._id.toString();

    await budgets.create(id1,'iPhone13',1000,'Electronic Devices','monthly');
    await budgets.create(id1,'monitor',500,'Electronic Devices','monthly');

    await budgets.create(id2,'MacBook',3000,'Electronic Devices','yearly');

    console.log('Done seeding database');
    await dbConnection.closeConnection();
}

main();