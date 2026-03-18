const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware.js");
const {addExpense,viewExpense,deleteExpense,category} = require("../controller/expense.controller.js");

router.post("/add",authMiddleware,addExpense);
router.get("/get",authMiddleware,viewExpense);
router.post("/del/:id",authMiddleware,deleteExpense);
router.get("/",authMiddleware,category);

module.exports = router;