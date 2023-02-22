const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middlewares/fetchuser');
const Notes = require('../models/Notes');
const router = express.Router();

// End-point to get all the notes of a signed in user using GET request
router.get('/getnotes', fetchUser, async (req, res)=> {
    const { page = 1, limit = 10 } = req.query;
    try {
        const notes = await Notes.find({user: req.user.id})
        .sort('-date')
        .limit(limit*1)
        .skip((page-1)*limit);
        const totalResults = await Notes.countDocuments({user: req.user.id});
        res.json({
            totalResults: totalResults,
            notes: notes
        });
    } catch(err) {
        // response an internal server error if happens
        console.log(err.message);
        res.status(500).send('Error: 500 | Internal Server Error!');
    }
});

// End-point to fetch a single note provided the user is logged in
router.get('/getnote/:id', fetchUser, async (req, res) => {
    try {
        // search and check if the requested note exists or not
        let note = await Notes.findById(req.params.id);
        if(!note) {
            return res.status(404).send("Not Found!");
        }
        // check if the user is authorized to access the note or not
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed!');
        }
        // response the note if user is allowed to access the note
        res.json(note);
    } catch(err) {
        // response an internal server error if happens
        console.log(err.message);
        res.status(500).send('Error: 500 | Internal Server Error!');
    }
});

// End-point to add a note to the notes collection for a signed in user
router.post('/addnote', fetchUser, [
    body('title').isLength({min: 1}),
    body('description').isLength({min: 1})
], async (req, res) => {
    const { title, description } = req.body;

    // If errors found with validation, reutrn a bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Creating a new Note
        const note = new Notes({
            title: title,
            description: description,
            user: req.user.id
        });
        // Saving the note to the database
        await note.save();
        // response a message on success
        res.json({message: 'New note added successfully!'});
    } catch(err) {
        // response an internal server error if happens
        console.log(err.message);
        res.status(500).send('Error: 500 | Internal Server Error!');
    }
});

// End-point to update the title of an existing note for a signed in user using POST request
router.post('/updatetitle/:id', fetchUser, [
    body('title').isLength({min: 1})
], async (req, res) => {
    // If errors found with validation, reutrn a bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // search and check if the requested note exists or not
        let oldNote = await Notes.findById(req.params.id);
        if(!oldNote) return res.status(404).send('Not Found!');
        // check if the user is authorized to update the note or not
        if(oldNote.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed!');
        }
        // Creating the updated note and update
        let noteUpdate = {
            title: req.body.title,
            description: oldNote.description
        }
        await Notes.findByIdAndUpdate(req.params.id, {$set: noteUpdate}, {new: true})
        // response a message on success
        res.json({message: 'Note updated successfully!'});
    } catch(err) {
        // response an internal server error if happens
        console.log(err.message);
        res.status(500).send('Error: 500 | Internal Server Error!');
    }
});

// End-point to update the description of an existing note for a signed in user using POST request
router.post('/updatedescription/:id', fetchUser, [
    body('description').isLength({min: 1})
], async (req, res) => {
    // If errors found with validation, reutrn a bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // search and check if the requested note exists or not
        let oldNote = await Notes.findById(req.params.id);
        if(!oldNote) return res.status(404).send('Not Found!');
        // check if the user is authorized to update the note or not
        if(oldNote.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed!');
        }
        // Creating the updated note and update
        let noteUpdate = {
            title: oldNote.title,
            description: req.body.description
        }
        await Notes.findByIdAndUpdate(req.params.id, {$set: noteUpdate}, {new: true})
        // response a message on success
        res.json({message: 'Note updated successfully!'});
    } catch(err) {
        // response an internal server error if happens
        console.log(err.message);
        res.status(500).send('Error: 500 | Internal Server Error!');
    }
});

// End-point to delete an existing note for a signed in user using DELETE request
router.delete('/deletenote/:id', fetchUser, async(req, res) => {
    try {
        // search and check if the requested note exists or not
        let note = await Notes.findById(req.params.id);
        if(!note) {
            return res.status(404).send("Not Found!");
        }
        // check if the user is authorized to delete the note or not
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed!');
        }
        // deleting the note
        await Notes.findByIdAndDelete(req.params.id);
        // response a message on success
        res.json({message: 'Note deleted successfully!'});
    } catch(err) {
        // response an internal server error if happens
        console.log(err.message);
        res.status(500).send('Error: 500 | Internal Server Error!');
    }
});

module.exports = router
