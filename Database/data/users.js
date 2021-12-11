const mongoCollections = require("../config/mongoCollections");
const usersCollection = mongoCollections.users;
const bcrypt = require("bcrypt");
let { ObjectId } = require("mongodb");
var nodemailer = require("nodemailer");

var errorCheck = function (string) {
  string = string.trim();
  if (!(typeof string === "string")) {
    throw "Input is not an string";
  }
  if (string.length == 0) {
    throw "Empty string";
  }
};

async function create(firstName, lastName, username, email, password, url) {

  if (!firstName ) throw 'You must provide a First Name';
  if (!lastName ) throw 'You must provide a Last Name';
  if (!username ) throw 'You must provide a Username';
  if (!password ) throw 'You must provide a Password';
  if (!email) throw 'You must provide an Email';

  if (typeof firstName !== 'string') throw 'First Name is invalid'
  if (typeof lastName !== 'string') throw 'Last Name is invalid'
  if (typeof email !== 'string') throw 'Email is invalid'

  if (!firstName.trim()) {
    throw "First Name contains white spaces";
  }
  firstName = firstName.trim();

  if (!lastName.trim()) {
    throw "Last Name contains white spaces";
  }
  lastName = lastName.trim();

  if (!email.trim()) {
    throw "Email contains white spaces";
  }
  email = email.trim();

  let mail = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  if(mail.test(email) === false){
    throw 'Invalid email'
  }

  username = username.trim();
  password = password.trim();
  errorCheck(username);
  if (username.trim().length < 4) {
    throw "username length must be greater than 4";
  }
  if (!username.trim().match(/^[0-9a-z]+$/)) {
    throw "username contains non alphanumeric ";
  }
  errorCheck(password);
  if (password.trim().length < 6) {
    throw "password length must be greater than 6";
  }
  const users_collection = await usersCollection();
  const List = await users_collection.find({}).toArray();
  let userlist = [];
  List.forEach((element) => {
    userlist.push(element.username.toLowerCase());
  });
  if (userlist.includes(username.toLowerCase())) {
    throw "username existed";
  }
  const hash = await bcrypt.hash(password, 10);
  let newUsers = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    hashPassword: hash,
    imgurl: url,
  };
  const insertinfo = await users_collection.insertOne(newUsers);
  const newId = insertinfo.insertedId;
  const new_users = await users_collection.findOne({ _id: newId });
  const newObjId = ObjectId(new_users._id);
  let x = new_users._id;
  x = newObjId.toString();
  new_users._id = x;

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
    subject: "New Account",
    text: "Your Account created successfully!!",
    // attachments: [
    //   {
    //     filename: "email.pdf",
    //     path: "C://Users/HP/Downloads/Stevens_2020-2021_Academic_Catalog.pdf",
    //   },
    // ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return new_users;
}
async function update(firstName, lastName, username, password, url, userid){

  if (!userid ) throw 'You must provide a Userid';
  if (!firstName ) throw 'You must provide a First Name';
  if (!lastName ) throw 'You must provide a Last Name';
  if (!username ) throw 'You must provide a Username';
  if (!password ) throw 'You must provide a Password';

  if (typeof userid !== 'string') throw 'User id is invalid'
  if (typeof firstName !== 'string') throw 'First Name is invalid'
  if (typeof lastName !== 'string') throw 'Last Name is invalid'


  if (!userid.trim()) {
    throw "User id contains white spaces";
  }
  userid = userid.trim();

  if (!firstName.trim()) {
    throw "First Name contains white spaces";
  }
  firstName = firstName.trim();

  if (!lastName.trim()) {
    throw "Last Name contains white spaces";
  }
  lastName = lastName.trim();


  username = username.trim();
  password = password.trim();
  errorCheck(username);
  if (username.trim().length < 4) {
    throw "username length must be greater than 4";
  }
  if (!username.trim().match(/^[0-9a-z]+$/)) {
    throw "username contains non alphanumeric ";
  }
  errorCheck(password);
  if (password.trim().length < 6) {
    throw "password length must be greater than 6";
  }
  const users_collection = await usersCollection();
  const res = await this.getbyid(userid);
  if (res === null) throw "Either the username or password is invalid";
  const hash = await bcrypt.hash(password, 10);
  let newUsers = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    hashPassword: hash,
    imgurl: url,
  };
  const updateinfo = await users_collection.updateOne(
    { _id: ObjectId(userid) },
    { $set: newUsers }
  );
  if (updateinfo.modifiedCount === 0) {
    throw "update failed";
  }
  const new_users = await users_collection.findOne({ _id: ObjectId(userid) });
  return new_users;
}

async function checklogin(username, password) {

  if (!username ) throw 'You must provide a Username';
  if (!password ) throw 'You must provide a Password';

  username = username.trim();
  password = password.trim();
  errorCheck(username);
  if (username.trim().length < 4) {
    throw "username length must be greater than 4";
  }
  if (!username.trim().match(/^[0-9a-z]+$/)) {
    throw "username contains non alphanumeric ";
  }
  errorCheck(password);
  if (password.trim().length < 6) {
    throw "password length must be greater than 6";
  }
  const users_collection = await usersCollection();
  const res = await users_collection.findOne({ username: username });
  if (res === null) throw "Either the username or password is invalid";
  let compare = await bcrypt.compare(password, res.hashPassword);
  if (compare) {
    return res;
  } else {
    throw "Either the username or password is invalid";
  }
}

async function getAll() {
  let list = [];
  const users_Collection = await usersCollection();
  const usersList = await users_Collection.find({}).toArray();

  for (let i = 0; i < usersList.length; i++) {
    let x = usersList[i]._id;
    let y = x.toString();
    usersList[i]._id = y;
  }

  for (let i = 0; i < usersList.length; i++) {
    let ls = { firstName: usersList[i].firstName };
    list.push(ls);
  }
  return list;
}

async function getbyid(userid) {
  if (!userid) throw "You must provide Userid";
  if (typeof userid !== "string") throw "Userid is invalid";
  if (!userid.trim()) {
    throw "User id contains white spaces";
  }
  userid = userid.trim();

  const users_Collection = await usersCollection();
  let user_id = await users_Collection.findOne({ _id: ObjectId(userid) });
  if (user_id === null) throw "No user with that id";
  user_id._id = user_id._id.toString();
  return user_id;
}

module.exports = {
  create,
  getAll,
  checklogin,
  getbyid,
  update,
};
