  import { useMutation, useQuery, useQueryClient } from 'react-query'

  import AnecdoteForm from './components/AnecdoteForm'
  import Notification from './components/Notification'
  import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

  const App = () => {
    const queryClient = useQueryClient()
    const notificationDispatch = useNotificationDispatch()
    const updateAnecdoteMutation = useMutation(updateAnecdote, {
      onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes')
        const newAnecdotes = anecdotes.map(a => a.id === newAnecdote.id ? newAnecdote: a)
        queryClient.setQueryData('anecdotes', newAnecdotes)
        notificationDispatch({type: "SET", payload: `anecdote "${newAnecdote.content}" was voted`})
        setTimeout(() => {
          notificationDispatch({type: "CLEAR"})
        }, 2000)
      }
    })

    const handleVote = (anecdote) => {
      const changedAnecdote = { ...anecdote, votes: anecdote.votes+1}
      updateAnecdoteMutation.mutate(changedAnecdote)
    }

    const result = useQuery({
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: false,
      fetchOnWindowFocus: false,
    })

    if (result.isError) {
      return <h4> anecdote service not available due to problems in server </h4>
    }

    if (result.isLoading) {
      return <h4> loading data ... </h4>
    }

    const anecdotes = result.data


    return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  export default App
