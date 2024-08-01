import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [errors, setErrors] = useState({ title: "", description: "", tag: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = { title: "", description: "", tag: "" };
    let isValid = true;

    if (note.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long.";
      isValid = false;
    }

    if (note.description.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters long.";
      isValid = false;
    }

    if (note.tag.trim().length < 5) {
      newErrors.tag = "Tag must be at least 5 characters long.";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" }); // Clear form after submission
    setErrors({ title: "", description: "", tag: "" }); // Clear errors
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            aria-describedby="titleHelp"
            onChange={onChange}
            value={note.title}
            minLength="3"
            required
          />
          <div className="invalid-feedback">
            {errors.title}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id="description"
            onChange={onChange}
            value={note.description}
            minLength="5"
            required
          />
          <div className="invalid-feedback">
            {errors.description}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            className={`form-control ${errors.tag ? 'is-invalid' : ''}`}
            id="tag"
            onChange={onChange}
            value={note.tag}
            minLength="5"
            required
          />
          <div className="invalid-feedback">
            {errors.tag}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
