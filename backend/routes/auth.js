const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// create a user using : POST "/api/auth/createuser", no login requireddoesnt required auth

// adding
// npm install --save express-validator

// change get to post
//router.get('/', (req,res)=>{
router.post("/createuser",[
    body("email", "enter a valid email name").isEmail(),
    body("name", "enter valid name bhai saab").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //this is extra  // console.log(req.body);
    // const user=User(req.body);
    // user.save()

    let user = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    })
    
    .then((user) => res.json(user))
    // res.send(req.body);
    .catch(error=> {console.log(error)
    res.json({error:"please enter a unique email",message:error.message})})
  });

module.exports = router;
