const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();

const crypto = require("crypto");

const { Session, Option } = require("./modules/Session.js");

const app = express();
app.use(
  cors({
    origin: [process.env.API_URL, "http://localhost:3000"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(
  `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD}@cluster0.4hcja6j.mongodb.net/ponderful?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
  }
);

app.get('/health', (_, res) => res.send('Testing health status'))

app.post("/", async (req, res) => {
  // console.log(crypto.randomUUID());
  const q = new Session({ _id: crypto.randomUUID() });
  //const q2 = new Option({optionName: "Thafffi Express"});
  //console.log("f")
  try {
    const result = await q.save();
    //await q2.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.post("/new-option", async (req, res) => {
  const post = req.body;
  const sessionID = post.sessionID;
  const optionName = post.option;
  //console.log(sessionID);
  //console.log(optionName);
  const q = new Option({ sessionID: sessionID, optionName: optionName });

  try {
    const result = await q.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete-option", async (req, res) => {
  //console.log(req.body);
  const sessionID = req.body.sessionID;
  const optionID = req.body.optionID;
  console.log(sessionID);
  console.log(optionID);

  const q = Option.deleteOne({ _id: optionID, sessionID: sessionID })
    .then((item) => console.log(item))
    .catch((err) => console.log(err));
});

app.get("/get-options/:sessionID", async (req, res) => {
  const sessionID = req.params.sessionID;
  //const sessionID = post;
  //console.log(sessionID);
  const q = Option.find({ sessionID: sessionID })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

app.put("/selected-option", async (req, res) => {
  const post = req.body.data.selectedOption;
  //console.log(post);
  const q = Option.findByIdAndUpdate(
    post._id,
    { optionValue: post.optionValue + 1 },
    { new: true }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.get("/get-results/:sessionID", async (req, res) => {
  const sessionID = req.params.sessionID;

  const q = Option.find({ sessionID: sessionID })
    .sort([["optionValue", -1]])
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});
