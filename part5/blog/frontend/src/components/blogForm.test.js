import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './blogForm'

test('<BlogForm /> calls the event handler with the right parameters when the save button is clicked', async () => {
    const title = 'testing Blog component'
    const author = 'mock author'
    const url = 'www.mock-url.com'
    const name = 'Artora Hellas'
    
    const mockCreate = jest.fn()
    const user = userEvent


    const { container } = render(<BlogForm createBlog={mockCreate} name={name}/>)

    const inputTitle = screen.getByPlaceholderText('enter title here')
    const inputAuthor = screen.getByPlaceholderText('enter author here')
    const inputUrl = screen.getByPlaceholderText('enter url here')
    const button = screen.getByText('create')

    await user.type(inputTitle, title)
    await user.type(inputAuthor, author)
    await user.type(inputUrl, url)
    await user.click(button)

    expect(mockCreate.mock.calls).toHaveLength(1)
    expect(mockCreate.mock.calls[0][0].title).toBe(title)
    expect(mockCreate.mock.calls[0][0].author).toBe(author)
    expect(mockCreate.mock.calls[0][0].url).toBe(url)
})