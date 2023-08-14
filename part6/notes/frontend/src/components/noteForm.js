import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import noteService from '../services/notes'

const NoteForm = (props) => {
    const [newNote, setNewNote] = useState('')
    const dispatch = useDispatch()

    const addNote = async (event) => {
        event.preventDefault()
        
        // const noteObject = {
        //     content: newNote,
        //     important: true
        // }

        // createNote(noteObject)
        const retNote = await noteService.create(newNote)
        dispatch(createNote(retNote))
        
        setNewNote('')
    }

    return (
        <div className="formDiv">
            <h2>Create a new note</h2>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={event => setNewNote(event.target.value)}
                    placeholder="write note content here"
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default NoteForm