import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
  const { note, updateNote, showAlert } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const handleUpdate = (note) => {
    updateNote(note);
  };

  return (
    <div>
      <div className="card my-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            {/* delete btn */}
            <i
              className="fa-solid fa-trash-can mx-2"
              onClick={() => {
                deleteNote(note._id);
                showAlert("Note deleted successfully", "success");
              }}
            ></i>
            {/* update btn */}
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => handleUpdate(note)}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
