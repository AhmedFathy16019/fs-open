const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Note = require('../models/note')
const app = require('../app')
const api = supertest(app)

mongoose.set('bufferTimeoutMS', 90000)

beforeEach(async () => {
    await Note.deleteMany({})

    await helper.insertMany(helper.initialNotes)
}, 10000)

describe('when there is initially some notes saved', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)
    
    test('all notes are returned', async () => {
        const response = await api.get('/api/notes')
    
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })
    
    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')
        const contents = response.body.map(note => note.content)
        
        expect(contents).toContain('Browser can execute only JavaScript')
    })
})

describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
        const notesAtStart = await helper.notesInDb()
    
        const noteToView = notesAtStart[0]
    
        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        expect(resultNote.body).toEqual(noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonExistingId = await helper.nonExistingId()

        await api
            .get(`/api/notes/${validNonExistingId}`)
            .expect(404)
    })

    test('fails with status code 400 if id is invalid', async () => {
        const invalidID = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/notes/${invalidID}`)
            .expect(400)
    })
})

describe('addition of new note', () => {
    test('succeeds with valid data', async () => {
        const newNote = {
            content: 'async/await simplifies making sync calls',
            important: true
        }
    
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const notesAtEnd = await helper.notesInDb()
        const contents = notesAtEnd.map(note => note.content)
    
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
        expect(contents).toContain('async/await simplifies making sync calls')
    })
    
    test('note without content is not added', async () => {
        const newNote = {
            important: true
        }
    
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)
    
        const notesAtEnd = await helper.notesInDb()
    
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})

describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]
    
        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)
    
        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
    
        const contents = notesAtEnd.map(n => n.content)
        expect(contents).not.toContain(noteToDelete.content)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})