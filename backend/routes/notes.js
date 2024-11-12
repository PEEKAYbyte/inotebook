const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
// const Note = require("../models/Notes");
// input validation for note is not empty
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

// route 1 GET ALL NOTE: using GET''/api/notes/getuser. login required
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
// route 2 add new NOTE: using POST''/api/notes/addnote. login required
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

// route 3 update an existing note..POST api/notes/update. login required
// same user find by id and same person can change the note
// we use POST or PUT
router.put(
  "/updatenote/:id",
  fetchuser,
  // [body('title','Pleas enter a valid title').isLength({min:3}),
  // body('description','description must be atleast 5 character long').isLength({min:5}),],
  async (req, res) => {
    // create a new object
    const newNote = {};
    const {title,description,tag}=req.body;
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    // find the note to be updated

    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
// check loged user is same or not...
    if(note.user && note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
    res.json({note});
  }
);

//.......................route 4 ..........
// route 4 delete an existing note..DELETE api/notes/deletenote. login required
// same user find by id and same person can not delete the note
// we use DELETE
router.delete(
  "/deletenote/:id",
  fetchuser,
  // [body('title','Pleas enter a valid title').isLength({min:3}),
  // body('description','description must be atleast 5 character long').isLength({min:5}),],
  async (req, res) => {
    // create a new object
    const newNote = {};
    const {title,description,tag}=req.body;
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    // find the note to be updated

    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
// check loged user is same or not...
    if(note.user && note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
    res.json({note});
  }
);

module.exports = router;
