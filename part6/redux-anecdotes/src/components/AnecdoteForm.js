import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch({type: 'anecdotes/createAnecdote', payload: content})
        dispatch({type: 'message/changeMessage', payload: `anecdote '${content}' created successfully`})
        setTimeout(() => dispatch({type: 'message/removeMessage'}), 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name='anecdote'/>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
