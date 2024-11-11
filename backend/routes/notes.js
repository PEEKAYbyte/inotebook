const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
// const Note = require("../models/Notes");
// input validation for note is not empty
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

// route 1 GET ALL NOTE: using GET''/api/auth/getuser. login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    // find notes
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
//..............route 2
// route 2 add new NOTE: using POST''/api/auth/addnote. login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // add notes

      //array destructrig for data get data
      const { title, description, tag } = req.body;
      // if there are error, return bad request , show error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal notes.js server error");
    }
  }
);

module.exports = router
