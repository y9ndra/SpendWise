const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.route.js")
const expenseRoute = require("./routes/expense.route.js");
require("dotenv").config();

const app = express();
app.use(helmet());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));



  
app.use("/auth",authRoute);
app.use("/expense",expenseRoute);
app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`);
});
