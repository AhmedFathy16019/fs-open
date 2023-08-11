import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Blog from './blog'

test('<Blog /> renders title, author, but not url or number of likes', () => {
    const title = 'testing Blog component'
    const author = 'mock author'
    const url = 'www.mock-url.com'
    const likes = 0;
    const blog = {
        title,
        author,
        url,
        likes
    }

    const { container } = render(<Blog blog={blog} />)

    const blogElement = container.querySelector('.blogSingle')

    expect(blogElement).toHaveTextContent(`${title} - ${author}`)
    expect(blogElement).not.toHaveTextContent(`${url}`)
    expect(blogElement).not.toHaveTextContent(`${String(likes)}`)
})

test('<Blog /> renders the url and likes when the show details button is pressed', async () => {
    const title = 'testing Blog component'
    const author = 'mock author'
    const url = 'www.mock-url.com'
    const likes = 0
    const blog = {
        title,
        author,
        url,
        likes,
        user: {
            username: 'hellas',
            name: 'Artora Hellas'
        }
    }

    const { container } = render(<Blog blog={blog} />)

    const user = userEvent
    const buttonView = screen.getByText('view')

    await user.click(buttonView)

    const blogElement = container.querySelector('.blogSingle')
    expect(blogElement).toHaveTextContent(`${title} - ${author}`)
    expect(blogElement).toHaveTextContent(`${url}`)
    expect(blogElement).toHaveTextContent(`${String(likes)}`)
})

test('<Blog /> like button event handler is called twice if pressed twice', async () => {
    const title = 'testing Blog component'
    const author = 'mock author'
    const url = 'www.mock-url.com'
    const likes = 0
    const blog = {
        title,
        author,
        url,
        likes,
        user: {
            username: 'hellas',
            name: 'Artora Hellas'
        }
    }
    const mockLike = jest.fn()

    const { container } = render(<Blog blog={blog} like={mockLike} />)

    const user = userEvent
    const buttonView = screen.getByText('view')

    await user.click(buttonView)

    const buttonLike = screen.getByText('like')
    await user.click(buttonLike)
    await user.click(buttonLike)
    
    expect(mockLike.mock.calls).toHaveLength(2)
})