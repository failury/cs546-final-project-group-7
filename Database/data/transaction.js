const mongoCollections = require("../config/mongoCollections");
const transactionCollection = mongoCollections.transaction;
let { ObjectId } = require("mongodb");
const { wallet } = require("../config/mongoCollections");
const PDFDocument = require("pdfkit");
var nodemailer = require("nodemailer");
const fs = require("fs");
const puppeteer = require("puppeteer");

const users = mongoCollections.users;

async function create(
  payment_Date,
  payment_Type,
  category,
  wallet,
  amt,
  memo,
  userid
) {
  // payment date error checking remaining

  if (!userid) throw "You must provide user id";
  if (!payment_Date) throw "You must provide payment date";
  if (!payment_Type) throw "You must provide payment type";
  if (!category) throw "You must select category";
  if (!wallet) throw "You must select wallet";
  if (!amt) throw "You must enter amount";

  if (typeof userid !== "string") throw "user id is invalid";
  if (typeof payment_Date !== "string") throw "Payment date is invalid";
  if (typeof payment_Type !== "string") throw "Payment Type is invalid";
  if (typeof category !== "string") throw "category is invalid";
  if (typeof wallet !== "string") throw "wallet is invalid";
  if (typeof amt !== "string") throw "Amount is invalid";

  if (!userid.trim()) {
    throw "user id contains white spaces";
  }
  userid = userid.trim();

  if (!payment_Type.trim()) {
    throw "Payment Type contains white spaces";
  }
  payment_Type = payment_Type.trim();

  if (!category.trim()) {
    throw "Category contains white spaces";
  }
  category = category.trim();

  if (!wallet.trim()) {
    throw "Wallet contains white spaces";
  }
  wallet = wallet.trim();

  if (!amt.trim()) {
    throw "Amount contains white spaces";
  }
  amt = amt.trim();

  const transaction_collection = await transactionCollection();

  let newTransaction = {
    payment_Date: payment_Date,
    payment_Type: payment_Type,
    category: category,
    wallet: wallet,
    amt: amt,
    memo: memo,
    user: ObjectId(userid),
  };
  const insertinfo = await transaction_collection.insertOne(newTransaction);
  const newId = insertinfo.insertedId;
  const new_transaction = await transaction_collection.findOne({ _id: newId });
  const newObjId = ObjectId(new_transaction._id);
  let x = new_transaction._id;
  x = newObjId.toString();
  new_transaction._id = x;
  return new_transaction;
}

async function getAllTransactionByid(userid) {
  if (!userid) throw "You must provide userid";
  if (typeof userid !== "string") throw "user id is invalid";
  if (!userid.trim()) {
    throw "User id contains white spaces";
  }
  userid = userid.trim();

  const transaction_Collection = await transactionCollection();
  const transactionList = await transaction_Collection
    .find({ user: ObjectId(userid) })
    .toArray();
  return transactionList;
}

async function deleteTransactionByid(transactionid, userid) {
  if (!transactionid) throw "You must provide transaction id";
  if (typeof transactionid !== "string") throw "transaction id is invalid";
  if (!transactionid.trim()) {
    throw "Transaction id contains white spaces";
  }
  transactionid = transactionid.trim();

  if (!userid) throw "You must provide userid";
  if (typeof userid !== "string") throw "user id is invalid";
  if (!userid.trim()) {
    throw "User id contains white spaces";
  }
  userid = userid.trim();

  const transaction_Collection = await transactionCollection();
  const transaction = await transaction_Collection.findOne({
    user: ObjectId(userid),
    _id: ObjectId(transactionid),
  });
  if (transaction == null) throw "item does not exist";
  const deletionInfo = await transaction_Collection.deleteOne({
    user: ObjectId(userid),
    _id: ObjectId(transactionid),
  });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not remove transaction with id of ${transactionid}`;
  }
  return { deleted: transactionid };
}

async function searchByDate(date, userid) {
  // error checking for date remaining

  if (!date) throw "You must provide date";
  if (typeof date !== "string") throw "date is invalid";
  if (!date.trim()) {
    throw "date contains white spaces";
  }
  date = date.trim();

  if (!userid) throw "You must provide userid";
  if (typeof userid !== "string") throw "user id is invalid";
  if (!userid.trim()) {
    throw "User id contains white spaces";
  }
  userid = userid.trim();

  const transaction_Collection = await transactionCollection();
  const transaction = await transaction_Collection.findOne({
    user: ObjectId(userid),
    date: date,
  });
  //   console.log(transaction);
  // <<<<<<< Updated upstream

  // =======
  //   return transaction;
  // >>>>>>> Stashed changes
}

async function searchByCategory(date, userid) {
  if (!date) throw "You must provide date";
  if (typeof date !== "string") throw "date is invalid";
  if (!date.trim()) {
    throw "date contains white spaces";
  }
  date = date.trim();

  if (!userid) throw "You must provide userid";
  if (typeof userid !== "string") throw "user id is invalid";
  if (!userid.trim()) {
    throw "User id contains white spaces";
  }
  userid = userid.trim();

  const transaction_Collection = await transactionCollection();
  const transaction = await transaction_Collection.findOne({
    user: ObjectId(userid),
    date: date,
  });
}

async function searchByPaymentType(date, userid) {
  // error checking remaining do not remove this line
  if (!date) throw "You must provide date";
  if (typeof date !== "string") throw "date is invalid";
  if (!date.trim()) {
    throw "date contains white spaces";
  }
  date = date.trim();

  if (!userid) throw "You must provide userid";
  if (typeof userid !== "string") throw "user id is invalid";
  if (!userid.trim()) {
    throw "User id contains white spaces";
  }
  userid = userid.trim();

  const transaction_Collection = await transactionCollection();
  const transaction = await transaction_Collection.findOne({
    user: ObjectId(userid),
    date: date,
  });
}

async function getAll() {
  let list = [];
  const transaction_Collection = await transactionCollection();
  const transactionList = await transaction_Collection.find({}).toArray();

  for (let i = 0; i < transactionList.length; i++) {
    let x = transactionList[i]._id;
    let y = x.toString();
    transactionList[i]._id = y;
  }

  for (let i = 0; i < transactionList.length; i++) {
    let ls = {
      payment_Date: transactionList[i].payment_Date,
      payment_Type: transactionList[i].payment_Type,
      Amt: transactionList[i].amt,
      memo: transactionList[i].memo,
    };
    list.push(ls);
  }
  return list;
}

async function getAllTransactionToEmail(userid) {
  if (!userid) throw "You must provide userid";
  if (typeof userid !== "string") throw "user id is invalid";
  if (!userid.trim()) {
    throw "User id contains white spaces";
  }
  userid = userid.trim();
  // console.log("dhhd");
  const a = await users();

  const user = await a.findOne({ _id: ObjectId(userid) });
  const email = user.email;
  const username = user.username;
  // console.log(user);

  const transaction_Collection = await transactionCollection();
  const transactionList = await transaction_Collection.find({}).toArray();
  // console.log(transactionList[0].user);
  // console.log(ObjectId(userid));

  let arr = [];
  for (let i = 0; i < transactionList.length; i++) {
    if (transactionList[i].user == userid) arr.push(transactionList[i]);
  }
  //console.log(arr);

  const doc = new PDFDocument();

  doc.text("\n\n");

  doc
    .font("Courier-BoldOblique")
    .fontSize(25)
    .text("TRANSACTION STATEMENT", { lineBreak: true, align: "center" });
  doc.fontSize(18);
  doc.text("\n\n\n");
  doc
    .image(
      "/Users/shefalee/Documents/GitHub/cs546-final-project-group-7/Database/spendthrift.jfif"
      // 210,
      // 15,
      // { fit: [200, 200] }
    )
    .stroke();
// // C:/Users/HP/OneDrive/Documents/GitHub/cs546-final-project-group-7/Database/spendthrift.jfif
  //doc.lineBreak();

  // const list = doc.struct("List");
  doc.text("\n");

  doc
    .fillColor("red")
    .font("Helvetica-BoldOblique")
    .fontSize("18")
    .text(username, { align: "center" });
  doc.text("\n");

  for (let i = 0; i < arr.length; i++) {
    const pDate = arr[i].payment_Date;
    const pType = arr[i].payment_Type;
    const category = arr[i].category;
    const wallet = arr[i].wallet;
    const amt = arr[i].amt;
    const memo = arr[i].memo;

    // console.log(date);

    str = JSON.stringify(arr[i]);
    doc
      .fillColor("black")
      .font("Times-Bold")
      .text(i + 1);
    doc.font("Times-Bold").text(`Date : ${pDate}`);
    //doc.font("Times-Roman").text(pDate);
    doc.font("Times-Bold").text(`Type : ${pType}`);
    // doc.font("Times-Roman").text(pType);
    doc.font("Times-Bold").text(`Category : ${category}`);
    //doc.font("Times-Roman").text(category);
    doc.font("Times-Bold").text(`Wallet : ${wallet}`);
    //doc.font("Times-Roman").text(wallet);
    doc.font("Times-Bold").text(`Amount : ${amt}`);
    // doc.font("Times-Roman").text(amt);
    doc.font("Times-Bold").text(`Memo : ${memo}`);
    // doc.font("Times-Roman").text(memo);
    doc.text("\n");
  }

  doc.pipe(fs.createWriteStream("statement.pdf"));

  doc.end();
  //console.log(doc);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vadchhakharsh@gmail.com",
      pass: "Universal@123",
    },
  });

  var mailOptions = {
    from: "vadchhakharsh@gmail.com",
    to: email,
    subject: "Transaction statement",
    text: "Your Transaction statement is here!!",
    attachments: [
      {
        filename: "statement.pdf",
        //path: doc,
        path: "/cs546-final-project-group-7/Database/statement.pdf",
      },
    ],
  };
  // // // C://Users/HP/OneDrive/Documents/GitHub/cs546-final-project-group-7/Database/statement.pdf
  // /// //Users/shefalee/Documents/GitHub/cs546-final-project-group-7/Database/statement.pdf

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = {
  create,
  getAllTransactionByid,
  getAll,
  deleteTransactionByid,
  searchByCategory,
  searchByDate,
  searchByPaymentType,
  getAllTransactionToEmail,
};
