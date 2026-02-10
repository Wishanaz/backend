const express = require("express")
const noteModel = require("./models/notes.model")
const app = express()

//middlewhere capable for reading the json data 
app.use(express.json())

//API Method ->POST   API-> /notes
app.post("/notes", async (req,res)=>{
    const {title, description} = req.body

    // create note using model | note created and data is in the cluster(mumbai)
    const note = await noteModel.create({
        title,description
    })

    res.status(200).json({
        message:"Note Created Successfully",
        note
    })

})


module.exports = app