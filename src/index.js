const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = mongoose.createConnection("mongodb://127.0.0.1:27017/userDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

//Models
const userModel = db.model("user", userSchema);
app.post("/user", async (req, res) => {
  const userBody = req.body;
  console.log(userBody);
  try {
    const user = await userModel.find({ email: userBody.email });
    console.log("=======================>", user);
    if (user?.length === 0) {
      const newUser = new userModel(userBody);
      await newUser.save();
      res.status(201).send(newUser);
    } else {
      res.status(201).send(user);
    }
  } catch (e) {
    res.sendStatus(404);
  }
});

app.listen(9999);
