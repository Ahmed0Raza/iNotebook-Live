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
    <div 
      className="my-3 mx-auto bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden"
      style={{ width: "350px", height: "150px" }} // Set fixed width and height
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <h5 
            className="text-lg font-bold truncate"
            style={{ width: "200px" }} // Control title width to ensure it fits within the container
          >
            {note.title}
          </h5>
          <div className="flex space-x-2">
            <i
              className="fa-solid fa-trash-can cursor-pointer text-red-500 hover:text-red-700"
              onClick={() => {
                deleteNote(note._id);
                showAlert("Note deleted successfully", "success");
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square cursor-pointer text-blue-500 hover:text-blue-700"
              onClick={() => handleUpdate(note)}
            ></i>
          </div>
        </div>
        <p 
          className="text-gray-300 text-sm flex-1 overflow-hidden"
          style={{ maxHeight: "80px", overflow: "hidden", textOverflow: "ellipsis" }} // Limit description height and add ellipsis
        >
          {note.description}
        </p>
      </div>
    </div>
  );
};

export default Noteitem;
