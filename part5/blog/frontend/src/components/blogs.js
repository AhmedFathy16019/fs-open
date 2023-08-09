import PropTypes from 'prop-types'
import Blog from './blog'

const Blogs = ({ blogs, like, remove }) => {
    console.log('blogs inside list :>> ', blogs)
    if (blogs.length > 1) {
        blogs.sort((a, b) => b.likes - a.likes)
    }
    return (
        <div>
            <h2>blogs</h2>
            <ul>
                {
                    blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} like={like} remove={remove}/>
                    )
                }
            </ul>
        </div>
    )
}

Blogs.propTypes = {
    blogs: PropTypes.array.isRequired,
    like: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
}

export default Blogs