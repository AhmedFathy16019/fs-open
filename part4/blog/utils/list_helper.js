const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sumLikes = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(sumLikes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    
    const maxLikes = blogs.reduce((max, blog) => {
        return blog.likes > max ? blog.likes : max
    }, 0)

    const favBlog = blogs.find(blog => blog.likes === maxLikes)

    delete favBlog.url

    return favBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}