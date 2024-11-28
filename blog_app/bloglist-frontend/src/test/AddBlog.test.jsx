import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlog from '../components/AddBlog'
import { beforeEach } from 'node:test'

describe('NewBlog', () => {
  test('Add a new Blog', async () => {
    const user = userEvent.setup()
    const newBlog = vi.fn()

    render(<AddBlog newBlog={newBlog} />)

    const title = screen.getByTestId('title')
    const url = screen.getByTestId('url')
    const author = screen.getByTestId('author')
    const button = screen.getByText('Create')

    await user.type(title, 'Testing the testing')
    await user.type(url, 'http://example.com')
    await user.type(author, 'Ted Tester')
    await user.click(button)

    expect(newBlog.mock.calls).toHaveLength(1)
    expect(newBlog.mock.calls[0][0]).toEqual({
      title: 'Testing the testing',
      url: 'http://example.com',
      author: 'Ted Tester',
    })
  })
})
