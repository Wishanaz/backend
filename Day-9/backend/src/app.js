/* server create krna */

const express = require("express")
const noteModel = require("./model/note.model")
const app = express()

app.use(express.json())


/*
* - Post /api/notes
* - create new note and save data in mongodb
* - req.body = title and description
*/

app.post("/api/notes", async (req,res)=>{
    const {title , description} = req.body
    const note = await noteModel.create({
        title,description
    })
    res.status(200).json({
        message: "Note created",
        note
    })

})

/* 
* - Get /api/notes
* - fetch all the notes data from mongo db and send them in the response
*/

app.get("/api/notes", async (req,res)=>{
    const notes =  await noteModel.find()

    res.status(200).json({
        message:"Notes fetched successfully",
        notes
    })
})

/**
 * - Delete /api/notes/id
 * - Delete note with the id from req.params
 */
app.delete("/api/notes/:id", async (req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"Note Deleted Successfullt."
    })
})


/**
 * - Patch /api/notes/:id 
 * - update the description of the note
 * - req.body = {description}
 */

app.patch("/api/notes/:id", async (req,res)=>{
    const id = req.params.id

    const {description}  = req.body
    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:"Note Updated Successfully."
    })
})


module.exports = app
