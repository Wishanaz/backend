import React, { useEffect, useState } from "react";

import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  //making three state variables for updation.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  //console.log("hello"); //rerender ho rha h yeh becoz of app state var changing

  // solution is we use useEffect() for axios.get

  //making a function and writing axios code in it then we will call that function in useEffect()
  // Fetch Notes
  function fetchNotes() {
    axios.get("https://backend-t6tb.onrender.com/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);
  // now useeffect m srf 1 bar code chalega.

  // Making a function to handle submit
  function handleSubmission(e) {
    e.preventDefault();

    if (editId) {
      axios
        .patch(`https://backend-t6tb.onrender.com/api/notes/${editId}`, {
          title,
          description,
        })
        .then(() => {
          resetForm();
          fetchNotes();
        });
    } else {
      axios
        .post("https://backend-t6tb.onrender.com/api/notes", {
          title,
          description,
        })
        .then(() => {
          resetForm();
          fetchNotes();
        });
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setEditId(null);
  }

  //Making a function for delete functionality
  function handleDeleteNote(noteId) {
    //calling delete api through axios
    axios.delete("https://backend-t6tb.onrender.com/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  //Making a function for updation
  function handleEdit(note) {
    setTitle(note.title);
    setDescription(note.description);
    setEditId(note._id);
  }

  return (
    <>
      {/* making a form */}
      <form className="note-create-form" onSubmit={handleSubmission}>
        <input
          type="text"
          placeholder="Write Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Write Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">{editId ? "Update Note" : "Create Note"}</button>
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note" key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>

              <button
                onClick={() => {
                  handleDeleteNote(note._id);
                }}
                className="delete"
              >
                Delete
              </button>

              <button className="update" onClick={() => handleEdit(note)}>
                Update
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
