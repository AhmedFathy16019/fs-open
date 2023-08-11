import { useState, useEffect, useRef } from 'react'
import './app.css'
import BlogForm from './components/blogForm'
import Blogs from './components/blogs'
import LoginForm from './components/loginForm'
import Notification from './components/notification'
import Togglable from './components/togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogappUser')
    console.log('loggedUserJSON :>> ', loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisible()
      blogService.setToken(user.token)

      const returnedBlog = await blogService.create(newBlog)
      console.log('returnedBlog :>> ', returnedBlog);
      setBlogs(blogs.concat(returnedBlog))
      
      setIsError(false)
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => setMessage(null), 5000)
    } catch (exception) {
      setIsError(true)
      setMessage(exception)
      setTimeout(() => setMessage(null), 5000)
    }
  } 

  const increaseLikes = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user._id
    }

    const modifiedBlog = await blogService.modify(updatedBlog, blog.id)
    setBlogs(blogs.map(blog => blog.id === modifiedBlog.id ? modifiedBlog : blog))
  }

  const removeBlog = async (blog) => {
    const id = blog.id
    blogService.setToken(user.token)
    try{
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b !== blog))
      setIsError(false)
      setMessage('Blog removed successfully')
      setTimeout(() => setMessage(null), 3000)
    } catch (exception) {
      setIsError(true)
      setMessage(exception)
      setTimeout(() => setMessage(null), 3000)
    }
  }
  console.log('blogs :>> ', blogs);
  return (
    <>
      <Notification isError={isError} message={message}/>
      {
        user === null
          ? <LoginForm
              onSubmit={handleLogin}
              username={username}
              changeUsername={setUsername}
              password={password}
              changePassword={setPassword}
            />
          : <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <BlogForm
                createBlog={addBlog}
                logout={handleLogout}
                name={user.name}
              />
            </Togglable>
      }
      {
        user && blogs.length > 0 
          ? <Blogs 
              blogs={blogs}
              like={increaseLikes}
              remove={removeBlog}
            /> 
          : null
      }
    </>
  )
}

export default App