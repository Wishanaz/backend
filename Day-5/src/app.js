/* 
-Server ko create krna
-Server ko config krna 
*/

const express = require("express")

const app = express() //server created
app.use(express.json())

const notes = []

// NOTE CREATE
app.post("/notes",(req,res)=>{
    notes.push(req.body)
    
    res.status(201).json({
        message:"Note created successfully"
    })
     
})

// NOTE FETCH
app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes:notes
    })
})


// NOTE DELETED
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.status(200).json({
        message:"Note deleted successfully"
    })
})


// NOTE UPDATE -ONLY DESCRIPTION
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.status(200).json({
        message:"Note description updated successfully"
    })
})



module.exports = app