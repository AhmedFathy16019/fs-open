import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const modify = async (modBlog, id) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, modBlog)
  return response.data
}

const remove = async(id) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, modify, remove }