const { budget } = require("../config/mongoCollections");
const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const budgets = data.budget;
const wallet = data.wallet;
const transaction = data.transaction;

async function main() {
  const db = await dbConnection.connectToDb();

  let user1 = await users.create('fname1','lname1','newer','123456789@gmail.com','12131415','');
  let id = user1._id;

  await wallet.create('mycard1','300','Credit',id);
  await wallet.create('mycard2','1500','Debit',id);

  await transaction.create('expense','2021-12-11','Entertainment','mycard1','150','memo',id);
  await transaction.create('expense','2021-12-10','Food and Beverage','mycard2','36','wine',id);
  await transaction.create('expense','2021-12-11','Others','mycard1','200','buy',id);
  await transaction.create('income','2021-12-10','Others','mycard1','90','no memo',id);
  await transaction.create('income','2021-12-11','Loan','mycard1','1000','need to pay back',id);

  await budgets.create(id,'wine','60','Food and Beverage','mycard1','Monthly');
  await budgets.create(id,'Gaming Monitor','600','Electronic Devices','mycard1','Yearly');
  await budgets.create(id,'Movie Tickets','160','Entertainment','mycard2','Monthly');


  console.log("Done seeding database");
  await dbConnection.closeConnection();
}

main();
