import React, { useState } from "react";

export default function Notepad() {
    const [notes, setNotes] = useState([]);
    const [noteInput, setNoteInput] = useState('');

    const addNote = () => {
        if (noteInput.trim()) {
            setNotes([...notes, noteInput]);
            setNoteInput('');
        }
    };

    const deleteNote = index => {
        const newNotes = notes.filter((_, i) => i !== index);
        setNotes(newNotes);
    };

    return (
        <div className='notepad'>
            <h3>Notepad</h3>
            <div className='notepad-input-container'>
                <input
                    type='text'
                    value={noteInput}
                    onChange={e => setNoteInput(e.target.value)}
                    placeholder='Enter note text'
                />
                <button onClick={addNote}>Add Note</button>
            </div>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>
                        {note} <button onClick={() => deleteNote(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
