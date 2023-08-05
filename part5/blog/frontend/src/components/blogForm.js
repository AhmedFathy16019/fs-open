import { useState } from 'react'

const BlogForm = ({createBlog, logout, name }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    
    const newBlog = {
      title,
      author,
      url
    }

    createBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  } 

  return (
    <div>
      <p>{`${name} logged in`}</p>
      <button onClick={logout}>logout</button>

      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </div>

        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>

        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({target}) => setUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm