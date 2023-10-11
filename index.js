const express = require("express");
const app = express();
const taskRouter = require("./routes/task");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
require('dotenv').config();
app.use(express.json());
const cors = require("cors")
app.use(cors())
const casual = require('casual');


mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log("Connected to DB!"))
  .catch((err) => {
    console.log("ERROR:", err);
  });
  

  app.use(taskRouter);
  app.use(userRouter);
  app.use((req, res) => {
    return res.status(404).json({ response: "Endpoint not exist" });
  });

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-undef
    console.log(`App started on port ${process.env.PORT}`);
  });
  
