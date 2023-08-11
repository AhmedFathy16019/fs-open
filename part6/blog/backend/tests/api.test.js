const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./api_test_helper')
const bcrypt = require('bcrypt');

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const blogsObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogsObjects.map(blog => blog.save())

    const promiseArrayUsers = helper.initialUsers.map(user => api.post('/api/users').send(user))
    
    await Promise.all(promiseArray)
    await Promise.all(promiseArrayUsers)
}, 10000)

const getToken = async () => {
    const user = {
        username: helper.initialUsers[1].username,
        password: helper.initialUsers[1].password
    }

    const response = await api
        .post('/api/login')
        .send(user)

    console.log('response :>> ', response.body);
    // console.log('token :>> ', response.body.token, typeof(response.body.token));

    return response.body.token
}


describe('when there are blogs in the database', () => {
    test('all blogs are retrieved and in json format', async () => {
        const blogs = await api.get('/api/blogs')
    
        expect(blogs.body).toHaveLength(helper.initialBlogs.length)
        
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('a blog identifier is identified with attribute, id', async () => {
        const blogs = await helper.blogsInDb()
    
        expect(blogs[0].id).toBeDefined()
    })
})

describe('adding a blog', () => {
    test('succeeds with valid data', async () => {
        const blog = {
            title: "This is a fake blog",
            author: "Fathy Kun",
            url: "/no/url/fake",
            likes: 0
        }
        
        const token = await getToken()

        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAfter = await helper.blogsInDb()
    
        const titles = blogsAfter.map(blog => blog.title)
        
        expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain('This is a fake blog')
    })

    test('without a likes attribute results in a blog with a default of 0 likes', async () => {
        const blog = {
            title: "This is still fake",
            author: "still me",
            url: "Nah not now",
        }

        const token = await getToken()

        const result = await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        console.log('result :>> ', result.body);
        expect(result.body.likes).toBe(0) 
    })
   
    test('without author or title results in a Bad Request with status 400', async () => {
        const blog = {
            url: "no url"
        }
        
        const token = await getToken()

        await api.post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(400)
    })

    test('without providing a token results in a unauthorized request with status 401', async () => {
        const blog = {
            title: "This is a fake blog",
            author: "Fathy Kun",
            url: "/no/url/fake",
            likes: 0
        }

        await api.post('/api/blogs')
            .send(blog)
            .expect(401)
    
        const blogsAfter = await helper.blogsInDb()
    
        const titles = blogsAfter.map(blog => blog.title)
        
        expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
        expect(titles).not.toContain('This is a fake blog')      
    })
})

describe('deleting a blog', () => {
    test('is successful with a valid id and results in 204 status code', async () => {
        const blogsBefore = await helper.blogsInDb()
        console.log('blogsBefore :>> ', blogsBefore);
        const blogToDelete = blogsBefore[0]
        console.log('blogToDelete :>> ', blogToDelete);
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAfter = await helper.blogsInDb()
        const titles = blogsAfter.map(blog => blog.title)

        expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating a blog', () => {
    test('is successful with a valid id and data', async () => {
        const blogsBefore = await helper.blogsInDb()

        let blogToUpdate = blogsBefore[0]

        blogToUpdate.title = 'Changed it'

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)

        const blogsAfter = await helper.blogsInDb()
        const titles = blogsAfter.map(b => b.title)
        
        expect(titles).toContain('Changed it')
    })
})
