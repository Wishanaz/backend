/* for schema */

const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title : String,
    description : String,
})

// model imp for crud operations on server
const noteModel = mongoose.model("notes", noteSchema) //notes is the collection name jisme saray notes ka data rkhna h


//export model to app.js
module.exports = noteModel