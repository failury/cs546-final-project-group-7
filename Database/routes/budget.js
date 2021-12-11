const express = require("express");
const router = express.Router();
const budgets = require("../data");
const budgetData = budgets.budget;
const jwt = require("jsonwebtoken");
const xss = require("xss");

router.get("/budget", async (req, res) => {
  let token = req.headers.token;

  if (!token) {
    res.status(400).json({ error: "Error" });
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
  let budget_name = xss(req.body.budget_name);

  if (!req.headers.token) {
    res.status(400).json({ error: "Error" });
    return;
  }

  if (!budget_name) {
    res.status(400).json({ error: "You must specify Budget Name " });
    return;
  }

  if (typeof budget_name !== "string") {
    res.status(400).json({ error: "Budget Name must be a string" });
    return;
  }

  if (!budget_name.trim()) {
    res.status(400).json({ error: "Budget Name contains white spaces " });
    return;
  }
  budget_name = budget_name.trim();

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
  let budgetname = xss(req.body.budgetname);
  let amount = xss(req.body.amount);

  if (!req.headers.token) {
    res.status(400).json({ error: "Error" });
    return;
  }

  if (!budgetname) {
    res.status(400).json({ error: "You must specify Budget Name " });
    return;
  }

  if (!amount) {
    res.status(400).json({ error: "You must specify amount " });
    return;
  }

  if (typeof budgetname !== "string") {
    res.status(400).json({ error: "Budget Name must be a string" });
    return;
  }

  if (typeof amount !== "string") {
    res.status(400).json({ error: "Amount must be a string" });
    return;
  }

  if (!budgetname.trim()) {
    res.status(400).json({ error: "Budget Name contains white spaces " });
    return;
  }
  budgetname = budgetname.trim();

  if (!amount.trim()) {
    res.status(400).json({ error: "Amount contains white spaces " });
    return;
  }
  amount = amount.trim();

  let budgetInfo = req.body;
  let token = req.headers.token;
  try {
    let id = jwt.verify(token, "mySecretKey").id;
    let newBudget = await budgetData.create(
      id,
      xss(budgetInfo.budgetname),
      xss(budgetInfo.amount),
      xss(budgetInfo.category),
      xss(budgetInfo.wallet),
      xss(budgetInfo.type)
    );
    res.json(newBudget);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.patch("/budget/update", async (req, res) => {
  let budgetInfo = req.body;
  let budgetid = xss(req.body.budgetid);
  let token = req.headers.token;

  if (!token) {
    res.status(400).json({ error: "Error" });
    return;
  }

  if (!budgetInfo) {
    res.status(400).json({ error: "You must provide all information" });
    return;
  }

  if (!budgetid) {
    res.status(400).json({ error: "You must specify Budget id" });
    return;
  }

  if (typeof budgetid !== "string") {
    res.status(400).json({ error: "Budget Id must be a string" });
    return;
  }

  let id = jwt.verify(token, "mySecretKey").id;

  try {
    let updatedBudget = await budgetData.update(
      budgetid,
      id,
      xss(budgetInfo.updateinfo)
    );
    res.json(updatedBudget);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post("/budget/delete", async (req, res) => {
  let budgetid = xss(req.body.id);

  if (!req.headers.token) {
    res.status(400).json({ error: "Error" });
    return;
  }

  if (!budgetid) {
    res.status(400).json({ error: "You must provide an id" });
    return;
  }

  if (typeof budgetid !== "string") {
    res.status(400).json({ error: "Id must be a string" });
    return;
  }

  if (!budgetid.trim()) {
    res.status(400).json({ error: "id contains white spaces " });
    return;
  }
  budgetid = budgetid.trim();

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
