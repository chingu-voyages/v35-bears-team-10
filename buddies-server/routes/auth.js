const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const express = require("express");
const BodyParser = require("body-parser");
const { celebrate, Joi, errors, Segments } = require("celebrate");

const app = express();
app.use(BodyParser.json());
//Register9

router.post(
  "/register",
  celebrate({
    body: Joi.object().keys({
      username: Joi.string().min(4).max(20).required(),
      email: Joi.string().lowercase().email(),
      password: Joi.string().min(6).max(40).required(),
    
    }),
  }),
  async (req, res) => {
    try {
      // password generatorno
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // create new users
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      // save user
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).send("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json();
  }
});

module.exports = router;
