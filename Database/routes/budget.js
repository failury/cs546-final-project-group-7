const express = require("express");
const router = express.Router();
const budgets = require("../data");
const budgetData = budgets.budget;
const jwt = require("jsonwebtoken");
const xss = require("xss");

router.get("/budget", async (req, res) => {
  let token = req.headers.token;

  if (!token) {
    res.status(400).json({ error: 'Error' });
    return;
  }

  try {
    let id = jwt.verify(token, "mySecretKey").id;
    let budget = await budgetData.getBudgetByUserId(id);
    res.json(budget);
  } catch (e) {
    res.status(404).json({ error: "budget not found" });
  }
});

router.post("/budget/budgetname", async (req, res) => {
  if (!req.headers.token){
    res.status(400).json({ error: 'Error' });
    return;
  }
  
  if (!req.body.budget_name){
    res.status(400).json({ error: 'You must specify Budget Name ' });
    return;
  }

  if(typeof req.body.budget_name !== 'string') {
    res.status(400).json({error: 'Budget Name must be a string'});
    return;
  }

  if(!req.body.budget_name.trim()){
    res.status(400).json({ error: 'Budget Name contains white spaces ' });
    return;
  }
  req.body.budget_name = req.body.budget_name.trim();

  let token = req.headers.token;
  let budgetname = xss(req.body.budget_name);
  //console.log(budgetname);

  try {
    let id = jwt.verify(token, "mySecretKey").id;
    console.log(id);
    let budget = await budgetData.getByBudgetName(budgetname, id);
    console.log(budget);
    res.json(budget);
  } catch (e) {
    res.status(404).json({ error: "budget not found" });
  }
});

router.post("/budget/add", async (req, res) => {
  
  if (!req.headers.token){
    res.status(400).json({ error: 'Error' });
    return;
  }

  if (!req.body.budget_name){
    res.status(400).json({ error: 'You must specify Budget Name ' });
    return;
  }

  if (!req.body.amount){
    res.status(400).json({ error: 'You must specify amount ' });
    return;
  }

  if(typeof req.body.budget_name !== 'string') {
    res.status(400).json({error: 'Budget Name must be a string'});
    return;
  }

  if(typeof req.body.amount !== 'string') {
    res.status(400).json({error: 'Amount must be a string'});
    return;
  }

  if(!req.body.budget_name.trim()){
    res.status(400).json({ error: 'Budget Name contains white spaces ' });
    return;
  }
  req.body.budget_name = req.body.budget_name.trim();

  if(!req.body.amount.trim()){
    res.status(400).json({ error: 'Amount contains white spaces ' });
    return;
  }
  req.body.amount = req.body.amount.trim();

  let budgetInfo = req.body;
  let token = req.headers.token;
  try {
    let id = jwt.verify(token, "mySecretKey").id;
    let newBudget = await budgetData.create(
      id,
      budgetInfo.budgetname,
      budgetInfo.amount,
      budgetInfo.category,
      budgetInfo.wallet,
      budgetInfo.type
    );
    res.json(newBudget);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.patch("/budget/update", async (req, res) => {

  let budgetInfo = req.body;
  let token = req.headers.token;

  if (!token){
    res.status(400).json({ error: 'Error' });
    return;
  }

  if (!budgetInfo){
    res.status(400).json({ error: 'You must provide all information' });
    return;
  }

  if (!req.body.budgetid){
    res.status(400).json({ error: 'You must specify Budget id' });
    return;
  }

  if(typeof req.body.budgetid !== 'string') {
    res.status(400).json({error: 'Budget Id must be a string'});
    return;
  }

  let id = jwt.verify(token, "mySecretKey").id;

  try {
    let updatedBudget = await budgetData.update(
      budgetInfo.budgetid,
      id,
      budgetInfo.updateinfo
    );
    res.json(updatedBudget);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post("/budget/delete", async (req, res) => {

  if (!req.headers.token){
    res.status(400).json({ error: 'Error' });
    return;
  }

  if (!req.body.id){
    res.status(400).json({ error: 'You must provide an id' });
    return;
  }

  if(typeof req.body.id !== 'string') {
    res.status(400).json({error: 'Id must be a string'});
    return;
  }

  if(!req.body.id.trim()){
    res.status(400).json({ error: 'id contains white spaces ' });
    return;
  }
  req.body.id = req.body.id.trim();

  let budgetid = xss(req.body.id);
  let token = req.headers.token;

  try {
    let id = jwt.verify(token, "mySecretKey").id;
    await budgetData.delete(budgetid, id);
    res.send("Budget Deleted");
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
