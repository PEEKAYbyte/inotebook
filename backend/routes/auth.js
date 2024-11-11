const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser =require('../middleware/fetchuser');

const JWT_SCRET = "jNE LEJ JELA";

// create a user using : POST "/api/auth/createuser", no login requireddoesnt required auth

// adding
// npm install --save express-validator

// change get to post
//router.get('/', (req,res)=>{

//router 1
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

      // data get user id as a authenticate
      const data = {
        user: {
          id: user.id,
        },
      };

      //data store in authtoken
      const authtoken = jwt.sign(data, JWT_SCRET);
      // console.log(jwtData);
      res.json({ authtoken });

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

//..route 2..........................login .........

// authenticate a user using post "/api/auth/login"  nno login required
router.post(
  "/login",
  [
    body("email", "enter a valid email name").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if there are error return request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }

    // email and password ae req.body mathi bahar kathie match kare.
    const { email, password } = req.body;
    // try catch use kari ne email match karshe,
    try {
      let user = await User.findOne({ email });
      // email khoto hase to error aavshe
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to correct credencials" });
      }
      // password ne compare karshe, encoded password sathe
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "please try to correct credencials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SCRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server  error occured");
    }
  }
);
//...................step 3 data fetch........

// route 3 : get loged in user detail using :POST"/api/auth/getuser" . login required
router.post('/getuser',fetchuser, async (req, res) => {


    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal step3  server error ");
    }
  }
);
module.exports = router;
