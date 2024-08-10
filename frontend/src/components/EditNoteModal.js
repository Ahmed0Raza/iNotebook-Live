import React from "react";

const EditNoteModal = ({ isModalOpen, note, errors, onChange, handleClick, closeModal }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h5 className="text-lg font-bold text-gray-700 dark:text-gray-100 mb-4">Edit Note</h5>
        <form>
          <div className="mb-4">
            <label htmlFor="etitle" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Title
            </label>
            <input
              type="text"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${errors.etitle ? 'border-red-500' : ''}`}
              id="etitle"
              name="etitle"
              onChange={onChange}
              value={note.etitle}
            />
            {errors.etitle && (
              <p className="text-red-500 text-sm mt-1">{errors.etitle}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="edescription" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Description
            </label>
            <input
              type="text"
              name="edescription"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${errors.edescription ? 'border-red-500' : ''}`}
              id="edescription"
              onChange={onChange}
              value={note.edescription}
            />
            {errors.edescription && (
              <p className="text-red-500 text-sm mt-1">{errors.edescription}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="etag" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Tag
            </label>
            <input
              type="text"
              name="etag"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${errors.etag ? 'border-red-500' : ''}`}
              id="etag"
              onChange={onChange}
              value={note.etag}
            />
            {errors.etag && (
              <p className="text-red-500 text-sm mt-1">{errors.etag}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleClick}
            >
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;
