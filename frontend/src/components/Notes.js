import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import EditNoteModal from "./EditNoteModal";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, setNotes } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const [errors, setErrors] = useState({ etitle: "", edescription: "", etag: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getNotes();
    } else {
      setNotes([]);
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
    setIsModalOpen(true);
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
    setIsModalOpen(false);
    props.showAlert("Note edited successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <EditNoteModal
        isModalOpen={isModalOpen}
        note={note}
        errors={errors}
        onChange={onChange}
        handleClick={handleClick}
        closeModal={closeModal}
      />

      <div className="container mx-auto my-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4 text-center">Your Notes</h2>
        {notes.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-center">No notes to display</div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {notes.map((note) => (
              <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
