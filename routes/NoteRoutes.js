const express = require("express");
const noteModel = require('../models/NotesModel');
const app = express()
const mongoose = require('mongoose');

//TODO - Create a new Note
//http://localhost:3000/notes
app.post('/notes', async (req, res) => {
    try{
        if(!req.body.noteTitle || !req.body.noteDescription) {
            return res.status(400).send({
                message: "It can not be empty"
            });
        }
        const newNote = new noteModel({...req.body})
        await newNote.save()
        return res.status(201).send({message: "Note had successfully created"})

    }catch(error){
        return res.status(500).send({error: error.message})
    }
});

//TODO - Retrieve all Notes
//http://localhost:3000/notes
app.get('/notes', async (req, res) => {
    try{
        const notes = await noteModel.find({})
        return res.status(201).send({status: "successfully retrieved", notes: notes})

    }catch(error){
        return res.status(500).send({error: error.message})
    }
});

//TODO - Retrieve a single Note with noteId
//http://localhost:3000/notes/{nid}
app.get('/notes/:noteId', async (req, res) => {
    try{
        const noteById = await noteModel.findById({_id: req.params.noteId})
        return res.status(201).send({note: noteById})

    }catch(error){
        return res.status(500).send({error: error.message})
   }
});

//TODO - Update a Note with noteId
//http://localhost:3000/notes/{nid}
app.put('/notes/:noteId', async (req, res) => {
    try{
        const note = await noteModel.findByIdAndUpdate(req.params.noteId,req.body, {new: true})
        if(!note){
            return res.status(400).send({message: "Note missing"});
        }else{
            return res.status(201).send({message: "Note updated", newNote: note})
        }
    
        }catch(error){
            return res.status(500).send({error: error.message})
    }
});

//TODO - Delete a Note with noteId
//http://localhost:3000/notes/{nid}
app.delete("/notes/:noteId", async (req, res) => {
    const noteId = req.params.noteId;
  
    try {
      const deletedNote = await noteModel.findByIdAndRemove(noteId);
      if (!deletedNote) {
        return res.status(404).send({
          message: "Note missing",
        });
      }
      return res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
      return res.status(500).send({
        message: "Failed to deleted",
        error: err.message,
      });
    }
});
  
module.exports = app