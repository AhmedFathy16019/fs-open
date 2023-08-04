const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

const BlogForm = ({blogs, addBlog, logout, name, title, author, url, changeTitle, changeAuthor, changeUrl}) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{`${name} logged in`}</p>
      <button onClick={logout}>logout</button>

      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({target}) => changeTitle(target.value)}
          />
        </div>

        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({target}) => changeAuthor(target.value)}
          />
        </div>

        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({target}) => changeUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogForm