import { useState } from 'react'

const BlogForm = ({ createBlog, logout, name }) => {
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
            id='title'
            type="text"
            value={title}
            onChange={({target}) => setTitle(target.value)}
            placeholder='enter title here'
          />
        </div>

        <div>
          author:
          <input
            id='author'
            type="text"
            value={author}
            onChange={({target}) => setAuthor(target.value)}
            placeholder='enter author here'
          />
        </div>

        <div>
          url:
          <input
            id='url'
            type="text"
            value={url}
            onChange={({target}) => setUrl(target.value)}
            placeholder='enter url here'
          />
        </div>

        <button id='create-blog' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm