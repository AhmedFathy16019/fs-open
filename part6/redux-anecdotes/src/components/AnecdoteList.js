import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        console.log('filter :>> ', filter)
        console.log('anecdotes :>> ', anecdotes)
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })
    anecdotes.sort((a, b) => {return b.votes - a.votes})

    const handleVote = (anecdote) => {
        dispatch(voteFor(anecdote.id))
        const message = `you voted '${anecdote.content}'`
        dispatch(setNotification(message, 5))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => handleVote(anecdote)}
                />
            )}
        </div>
    )
}

export default AnecdoteList