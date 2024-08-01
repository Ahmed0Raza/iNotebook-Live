import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, setNotes } = context; // Added setNotes
  const refClose = useRef(null);
  const ref = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const [errors, setErrors] = useState({ etitle: "", edescription: "", etag: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getNotes();
    } else {
      setNotes([]); // Clear the notes state if no token is found
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    let newErrors = { etitle: "", edescription: "", etag: "" };
    let isValid = true;

    if (note.etitle.trim().length < 3) {
      newErrors.etitle = "Title must be at least 3 characters long.";
      isValid = false;
    }

    if (note.edescription.trim().length < 5) {
      newErrors.edescription = "Description must be at least 5 characters long.";
      isValid = false;
    }

    if (note.etag.trim().length < 5) {
      newErrors.etag = "Tag must be at least 5 characters long.";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note edited successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.etitle ? 'is-invalid' : ''}`}
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                  />
                  <div className="invalid-feedback">
                    {errors.etitle}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    name="edescription"
                    className={`form-control ${errors.edescription ? 'is-invalid' : ''}`}
                    id="edescription"
                    onChange={onChange}
                    value={note.edescription}
                  />
                  <div className="invalid-feedback">
                    {errors.edescription}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    name="etag"
                    className={`form-control ${errors.etag ? 'is-invalid' : ''}`}
                    id="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                  <div className="invalid-feedback">
                    {errors.etag}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 && <div>No notes to display</div>}
        <div className="row">
          {notes.map((note) => {
            return (
              <div className="col-md-4" key={note._id}>
                <Noteitem updateNote={updateNote} note={note} showAlert={props.showAlert}/>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
