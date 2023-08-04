import { useState, useEffect } from 'react'
import './app.css'
import BlogForm from './components/blogForm'
import LoginForm from './components/loginForm'
import Notification from './components/notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setIsError(false)
      setMessage(`${user.name} logged in successfully`)
      setTimeout(() => setMessage(null), 5000)
    } catch (exception) {
      setIsError(true)
      setMessage('Wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setIsError(false)
    setMessage('Logged out successfully')
    setTimeout(() => setMessage(null), 5000)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }

    try {
      blogService.setToken(user.token)
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setIsError(false)
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => setMessage(null), 5000)
    } catch (exception) {
      setIsError(true)
      setMessage(exception)
      setTimeout(() => setMessage(null), 5000)
    }
  } 

  return (
    <>
      <Notification isError={isError} message={message}/>
      {user === null
        ? <LoginForm
            onSubmit={handleLogin}
            username={username}
            changeUsername={setUsername}
            password={password}
            changePassword={setPassword}
          />
        : <BlogForm
            blogs={blogs}
            addBlog={addBlog}
            logout={handleLogout}
            name={user.name}
            title={title}
            author={author}
            url={url}
            changeTitle={setTitle}
            changeAuthor={setAuthor}
            changeUrl={setUrl}
          />
      }
    </>
  )
}

export default App