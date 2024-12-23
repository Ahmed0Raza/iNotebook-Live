import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "https://inotebook-live.onrender.com";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    
    // Get all notes
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            const json = await response.json();
            setNotes(json);
        } catch (error) {
        }
    };

    // Add a Note
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to add note: ${errorText}`);
            }

            const json = await response.json();

            const note = {
                "_id": json._id,
                "user": json.user,
                "title": title,
                "description": description,
                "tag": tag,
                "date": json.date,
                "__v": json.__v
            };
            setNotes(notes.concat(note));
        } catch (error) {
        }
    };

    // Delete a Note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                }
            });
            

            // Remove note from state
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
        }
    };

    // Update a Note
    const editNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update note: ${errorText}`);
            }

            // Update note in state
            setNotes(notes.map(note => note._id === id ? { ...note, title, description, tag } : note));
        } catch (error) {
        }
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
