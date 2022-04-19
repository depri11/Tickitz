require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./src/configs/db");
const route = require("./src/routers");
const cors = require("cors");

const PORT = process.env.PORT || 1000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/api/v1", route);

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
