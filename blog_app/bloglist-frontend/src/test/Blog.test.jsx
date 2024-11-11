import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'


test('renders content', () => {
  const blog = {
    title:'blog-test',

  }

  const { container } = render(<Blog blog={blog} />)

  //   screen.debug()
  //screen.debug(element)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('blog-test')

})

test('toggles visibility of blog details', async () => {
  const user = userEvent.setup()

  const blog = {
    title: 'Blog-toggle',
    author: 'Blog-toggle-author',
    url: 'https://blog-toggle-url.com',
    likes: 0
  }

  const handleAddLike = vi.fn()
  const handleDelete = vi.fn()

  render(<Blog blog={blog} handleAddLike={handleAddLike} handleDelete={handleDelete} />)

  // Initially, details should not be visible
  expect(screen.queryByText('likes: 0')).toBeNull()
  expect(screen.queryByText('https://blog-toggle-url.com')).toBeNull()

  // Click "Show" button to display details
  const showButton = screen.getByText('Show')
  await user.click(showButton)

  // After clicking "Show", details should be visible
  expect(screen.getByText('likes: 0')).toBeInTheDocument()
  expect(screen.getByText('https://blog-toggle-url.com')).toBeInTheDocument()

  // Click "Hide" button to hide details
  const hideButton = screen.getByText('Hide')
  await user.click(hideButton)

  // After clicking "Hide", details should not be visible again
  expect(screen.queryByText('likes: 0')).toBeNull()
  expect(screen.queryByText('https://blog-toggle-url.com')).toBeNull()
})