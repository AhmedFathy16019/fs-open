import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (content) => {
    const newAnecdote = {
        content,
        id: getId(),
        votes: 0
    }

    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const update = async (newAnecdote) => {
    const url = `${baseUrl}/${newAnecdote.id}`
    const response = await axios.put(url, newAnecdote)
    return response.data
}

const anecdoteService = { getAll, create, update }

export default anecdoteService