import { useState } from 'react'

const Blog = ({ blog, like, remove }) => {
    const [full, setFull] = useState(false)

    const toggleFull = () => {
        setFull(!full)
    }

    const increaseLikes = (event) => {
        event.preventDefault()

        like(blog)
    }

    const deleteBlog = (event) => {
        event.preventDefault()

        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            remove(blog)
        }
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const currentUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

    return (
        <div style={blogStyle} className='blogSingle'>
            <div>
                {blog.title} - {blog.author}
            </div>
            <button onClick={toggleFull}>{full ? 'hide' : 'view'}</button>
            {full
                ?   <div>
                    <p>{blog.url}</p>
                    <p>{blog.likes}</p>
                    <button onClick={increaseLikes}>like</button>
                    <p>{blog.user.name}</p>
                    {currentUser.username === blog.user.username
                        ? <button onClick={deleteBlog}>remove</button>
                        : null
                    }
                </div>
                :   null
            }
        </div>
    )
}

export default Blog