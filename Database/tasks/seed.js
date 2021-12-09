const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
// const categories = data.category;
// const budgets = data.budget;
// const wallet = data.wallet;
const transaction = data.transaction;

async function main() {
  const db = await dbConnection.connectToDb();
  //await db.dropDatabase();

  // let budget = await budgets.getByBudgetName('wine','61aec22bf54a16fe120b0c72');
  // console.log(budget);
  let budget = await transaction.getAllTransactionToEmail(
    "61b124f8170f8e0445abff59"
  );

  console.log("Done seeding database");
  await dbConnection.closeConnection();
}

main();
