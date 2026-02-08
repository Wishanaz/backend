/* 
-server create krna
-server config krna
*/

const express = require("express")
const app = express() //server create hogaya

//middlewhere express.json takay req.body m data a ske
app.use(express.json())

const notes = [
    // {
    //     title: "test title 1",
    //     description:"test description 1"
    // }
]

app.get("/",(req,res)=>{
    res.send("Hello")
})

//client creates notes
app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    console.log(notes)
    res.send("note created")
})

//client see notes
app.get("/notes",(req,res)=>{
    res.send(notes)

})

//client delete notes
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.send("Note Deleted Successfully!")
})

//client updates only description of notes.  /notes:/index
//req.body have the description req.body = {description:- "sample modified descreption"}
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send("Note's Description Updated!")
})


//EXPORT
module.exports = app