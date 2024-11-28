import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'
import { describe, test } from 'vitest'
import { beforeEach } from 'node:test'

describe('Blog App', () => {
  const blog = {
    title: 'Testing the testing',
    url: 'http://example.com',
    author: 'Ted Tester',
    likes: 10,
  }

  test('renders content', () => {
    const blog = {
      title: 'blog-test',
    }
  })
  test('renders only tile and author by default', () => {
    render(<Blog blog={blog} handleVote={vi.fn()} handleDelete={vi.fn()} />)
    expect(
      screen.getByText('Testing the testing', { exact: false })
    ).toBeDefined()
    expect(
      screen.queryByText('http://example.com', { exact: false })
    ).toBeNull()
  })

  test('renders url and likes after clicking view', async () => {
    const user = userEvent.setup()

    render(<Blog blog={blog} handleVote={vi.fn()} handleDelete={vi.fn()} />)
    const button = screen.getByText('View')
    await user.click(button)

    expect(
      screen.getByText('http://example.com', { exact: false })
    ).toBeDefined()
    expect(screen.getByText('Likes: 10', { exact: false })).toBeDefined()
  })

  test('clicking like twice calls event handler twice', async () => {
    const handleAddLike = vi.fn()
    const user = userEvent.setup()

    render(
      <Blog blog={blog} handleAddLike={handleAddLike} handleDelete={vi.fn()} />
    )
    const button = screen.getByText('View')
    await user.click(button)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleAddLike.mock.calls).toHaveLength(2)
  })
})
