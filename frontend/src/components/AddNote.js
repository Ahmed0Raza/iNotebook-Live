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
    setNote({ title: "", description: "", tag: "" });
    setErrors({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl p-6 box-border" style={{ marginTop: -30 }}>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6 text-center">Add a Note</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${errors.title ? 'border-red-500' : ''}`}
              id="title"
              name="title"
              onChange={onChange}
              value={note.title}
              minLength="3"
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              className={`mt-1 block w-full px-3 py-2 h-20 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${errors.description ? 'border-red-500' : ''}`}
              id="description"
              onChange={onChange}
              value={note.description}
              minLength="5"
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div>
            <label htmlFor="tag" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tag
            </label>
            <input
              type="text"
              name="tag"
              className={`mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${errors.tag ? 'border-red-500' : ''}`}
              id="tag"
              onChange={onChange}
              value={note.tag}
              minLength="5"
              required
            />
            {errors.tag && (
              <p className="text-red-500 text-sm mt-1">{errors.tag}</p>
            )}
          </div>
          <div className="my-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
