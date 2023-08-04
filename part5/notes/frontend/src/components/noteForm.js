const NoteForm = ({onSubmit, value, onChange, name}) => {
    return (
        <div>
            
            <p>{name} logged in</p>
            
            <form onSubmit={onSubmit}>
                <input value={value} onChange={onChange} />
                <button type="submit">save</button>
            </form>
            
        </div>
    )
}

export default NoteForm