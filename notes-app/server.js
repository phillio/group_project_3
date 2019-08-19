const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan')
const passport = require('passport');
const path = require('path');


const app = express();

// import models
const { User, Note, Folder } = require('./models');


const PORT = process.env.PORT || 4567

app.use(bodyParser.json())
// app.use(errorHandler)

//-- WORKS
app.get('/', async (req, res) => {
  try {
    res.send('Project 3 GG SON!!')
  }
  catch (err) {
    throw err
  }
})

// /user/:id/folder/:id/note/:id


// get all folders-- WORKS
app.get('/user/:user_id', async (req, res) => {
  try {
    const id = req.params.user_id
    const findUser = await Folder.findAll({ where: { userId: id } })
    res.send(findUser)
  } catch (error) {
    throw error
  }
})

// gets all notes from a specific folder-- WORKS
app.get('/user/:id/folders/:folder_id', async (req, res) => {
  try {
    const userId = 
    else {

    }
  }
  catch (error) {
    throw error
  }
})

// creates one folder -- works 
app.post('/user/:user_id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id)
    if (user) {
      const newFolder = await Folder.create(req.body)
      await newFolder.setUser(user)
      res.send(newFolder)
    }
    else {
      res.status(400).json({
        message: "user not found"
      })
    }
  } catch (error) {
    throw error
  }
})

// creates one note need work
app.post('/user/folders/:folder_id/notes/:note_id', async (req, res) => {
  try {
    const newNote = await Note.create(req.body)
    res.send(newNote)
  } catch (error) {
    throw error
  }
})

// edit note need work
app.put('/user/folders/:folder_id/notes/:note_id', async (req, res) => {
  try {
    const updateNotes = await Note.update(
      { name: req.body.name },
      { where: { id: req.params.id } }
    )
  } catch (error) {
    throw error
  }
})

// delete note
app.delete('/user/folders/:folder_id/notes/:note_id', async (req, res) => {
  try {
    await Note.destroy()
  } catch (error) {
    throw error
  }
})

app.delete('/user/folders/:folder_id', async (req, res) => {
  try {
    await Folder.destroy()
  } catch (error) {
    throw error
  }
})

app.listen(PORT, () => console.log(`Up and running on Port ${PORT}`))