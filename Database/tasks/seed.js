const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const categories = data.category;
const budgets = data.budget;
const wallet = data.wallet;
const transaction = data.transaction;

async function main() {
    const db = await dbConnection.connectToDb();
    //await db.dropDatabase();

    //await wallet.create('Card3','500','Debit','61aec22bf54a16fe120b0c72')
    await transaction.create('2021-12-03','income','groceries','Card3','199','daily','61aec22bf54a16fe120b0c72');
    await transaction.create('2021-12-04','income','groceries','Card4','269','daily','61aec22bf54a16fe120b0c72');
    await transaction.create('2021-12-05','income','groceries','Card3','129','daily','61aec22bf54a16fe120b0c72');

    console.log('Done seeding database');
    await dbConnection.closeConnection();
}

main();