const { budget } = require("../config/mongoCollections");
const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
// const categories = data.category;
const budgets = data.budget;
// const wallet = data.wallet;
const transaction = data.transaction;

async function main() {
  const db = await dbConnection.connectToDb();
  await budgets.create('61aec22bf54a16fe120b0c72','wine','60','Food and Beverage','Card3','Monthly');
  //await budgets.getBudgetByUserId('61aec22bf54a16fe120b0c72');

  console.log("Done seeding database");
  await dbConnection.closeConnection();
}

main();
