const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

// route 1 GET ALL NOTE: using GET''/api/auth/getuser. login required 
router.get('/fetchallnotes',fetchuser, (req,res)=>{
    
    res.json([])
})

module.exports = router