const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); 
var jwt = require("jsonwebtoken");

const JWT_SCRET = "jNE LEJ JELA"

// create a user using : POST "/api/auth/createuser", no login requireddoesnt required auth

// adding
// npm install --save express-validator

// change get to post
//router.get('/', (req,res)=>{
router.post(
  "/createuser",
  [
    body("name", "enter valid name bhai saab").isLength({ min: 3 }),
    body("email", "enter a valid email name").isEmail(),
    body("password", "password must beatleast 5 character long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check whether the user with this email already exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "same email id match" });
      }

      //this is extra  // console.log(req.body);
      // const user=User(req.body);
      // user.save()
      //bcryptjs use karva maate password ma change kariu che.
      const salt = await bcrypt.genSalt(10);
      // password ma salt add kare che.
      // npm i jsonwebtoken install for token
      const SecPass = await bcrypt.hash(req.body.password, salt);

      // create a new user
      user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: SecPass,
      });
      const data ={
        user:{
          id:user.id
        }
      }

      //data store in authtoken
      const authtoken = jwt.sign(data, JWT_SCRET);
      // console.log(jwtData);
      res.json({authtoken})


      // res.json(user);
      //data send es6 authtoken


      // .then((user) => res.json(user))
      // res.send(req.body);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);
module.exports = router;
