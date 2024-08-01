const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1: Get All the Notes using GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    res.status(500).send('Server Error');
  }
});

// Route 2: Add a new Note using POST "/api/notes/addnote". Login required
router.post(
  '/addnote',
  fetchuser,
  [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least five characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error('Error adding note:', error.message);
      res.status(500).send('Server Error');
    }
  }
);

// Route 3: update an existing Note using PUT "/api/notes/updatenote". Login required
router.put(
  '/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    // Create new Note
    const newNote={};
    if(title)
    {
      newNote.title= title;
    }
    if(description)
    {
      newNote.description= description;
    }
    if(tag)
    {
      newNote.tag= tag;
    }
    // Find note to be updated and updating
    let note =await Notes.findById(req.params.id);
    if(!note)
    {
      return res.status(404),send("Not Found");
    }
    if(note.user.toString() !== req.user.id)
    {
      return res.status(401),send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true} )
    res.json(note);
   })

// Route 3: delete an existing Note using DELETE "/api/notes/deletenote". Login required
router.delete(
  '/deletenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    
    // Find note to be delete and deleting it
    let note =await Notes.findById(req.params.id);
    if(!note)
    {
      return res.status(404).send("Not Found");
    } 
    // Allow deletion only if users owns this Note
    if(note.user.toString() !== req.user.id)
    {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id )
    res.json("Succes: Note has been Deleted");
   })

 
module.exports = router;
