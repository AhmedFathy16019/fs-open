import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Header = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const range = anecdotes.length

  const randomClick = () => {
    const rand = Math.floor(Math.random() * range)
    setSelected(rand)
  }
  
  const [points, setPoints] = useState(Array(range).fill(0))

  const voteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }


  let maxAnecdote = points.indexOf(Math.max(...points))

  return (
    <>
      <Header text='Anecdote of the day' />
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} points
      </div>
      <Button handleClick={randomClick} text='next anecdote' />
      <Button handleClick={voteClick} text='vote' />
      <Header text='Anecdote with most votes' />
      <div>
        {anecdotes[maxAnecdote]}
      </div>
      <div>
        has {points[maxAnecdote]} points
      </div>
    </>
  )
}

export default App