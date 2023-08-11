const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./api_test_helper')

describe('Adding a new user', () => {
    test('is not successful when the username is invalid or missing', async () => {
        const usersAtStart = helper.usersInDb()

        const invalidUser = {
            username: "AF",
            name: "Ahmed Fathi",
            password: "Hello There"
        }

        let response = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        console.log('response to invalid username', response.body);

        const missingUser = {
            name: "Ahmed Fathi",
            password: "Hello There"
        }

        response = await api
            .post('/api/users')
            .send(missingUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        console.log('response to missing username', response.body);

        const usersAtEnd = helper.usersInDb()

        expect(usersAtStart).toEqual(usersAtEnd)
    }, 10000)
    
    test('is not successful when the password is invalid or missing', async () => {
        const usersAtStart = helper.usersInDb()

        const invalidUser = {
            username: "fathi",
            name: "Ahmed Fathi",
            password: "He"
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const missingUser = {
            username: "fathi",
            name: "Ahmed Fathi",
        }

        await api
            .post('/api/users')
            .send(missingUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = helper.usersInDb()

        expect(usersAtStart).toEqual(usersAtEnd)
    }, 10000)
})