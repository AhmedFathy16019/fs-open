const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <li className='note'>
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

const Notes = ({ notes, toggleImportance }) => {
  return (
    notes.map(note => {
      return (
        <Note note={note} key={note.id} toggleImportance={toggleImportance}/>
      )
    })
  )
}
export default Notes