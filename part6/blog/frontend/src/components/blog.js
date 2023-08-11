import { useState } from 'react'

const Blog = ({ blog, like, remove }) => {
    const [full, setFull] = useState(false)
    console.log('blog inside component :>> ', blog);
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
            <button className='toggle-details' onClick={toggleFull}>{full ? 'hide' : 'view'}</button>
            {full
                ?   <div>
                    <p>{blog.url}</p>
                    <p className='blog-likes'>{blog.likes}</p>
                    <button onClick={increaseLikes} className='like-button'>like</button>
                    <p>{blog.user.name}</p>
                    {currentUser.username === blog.user.username
                        ? <button onClick={deleteBlog} className='delete-button'>remove</button>
                        : null
                    }
                </div>
                :   null
            }
        </div>
    )
}

export default Blog