const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const listRouter = require("./routers/listRouter");
const connect = require("connect-history-api-fallback");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(connect());
app.use("/api/users", userRouter);
app.use("/api/lists", listRouter);

mongoose
  .connect(process.env.DB_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDb");
    app.listen(port, () => {
      console.log("live on port", port);
    });
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "public", "index.html"));
});
