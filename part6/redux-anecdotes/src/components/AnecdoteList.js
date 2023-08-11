import { useDispatch, useSelector } from 'react-redux'

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
        dispatch({type: 'anecdotes/voteFor', payload: anecdote.id})
        dispatch({type: 'message/changeMessage', payload: `you voted '${anecdote.content}'`})
        setTimeout(() => {
            dispatch({type: 'message/removeMessage'})
        }, 5000)
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