import { render, screen,waitFor } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'
import AddBlog from '../components/AddBlog'
import blogService from '../services/blogs'


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

  const showButton1 = screen.getByText('Show')
  await user.click(showButton1)
  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  // Assert that handleAddLike was called twice
  expect(handleAddLike).toHaveBeenCalledTimes(2)
})

vi.mock('../services/blogs')

test('Add a blog', async () => {
  const user = userEvent.setup()

  const setBlogs = vi.fn()
  const setNewBlog = vi.fn()
  const setNotificationMessage = vi.fn()
  const setNotificationType = vi.fn()
  const toggleVisibility = vi.fn()
  blogService.create.mockResolvedValue({
    title: 'Testing Blog Title',
    author: 'Testing Blog Author',
    url: 'http://testing.blog.url',
    likes: 0,
    id: '123'
  })

  render(
    <AddBlog
      blogs={[]}
      setBlogs={setBlogs}
      newBlog={{ title: '', author: '', url: '' }}
      setNewBlog={setNewBlog}
      setNotificationMessage={setNotificationMessage}
      setNotificationType={setNotificationType}
      toggleVisibility={toggleVisibility}
    />
  )

  await blogService.create.mockResolvedValue({
    title: 'Testing Blog Title',
    author: 'Testing Blog Author',
    url: 'http://testing.blog.url',
    likes: 0,
    id: '123'
  })
  await user.type(screen.getByPlaceholderText('The Title of the blog'), 'Testing Blog Title')
  await user.type(screen.getByPlaceholderText('The author of the blog'), 'Testing Blog Author')
  await user.type(screen.getByPlaceholderText('The URL of the blog'), 'http://testing.blog.url')

  const sendButton = screen.getByText('Create')
  await user.click(sendButton)

  await waitFor(() => expect(blogService.create).toHaveBeenCalledWith({
    title: 'Testing Blog Title',
    author: 'Testing Blog Author',
    url: 'http://testing.blog.url'
  }))
  expect(blogService.create).toHaveBeenCalledTimes(1)


})

test('Like a blog twice', async () => {
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


  // Click "Show" button to display details
  const showButton = screen.getByText('Show')
  await user.click(showButton)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  // Assert that handleAddLike was called twice
  expect(handleAddLike).toHaveBeenCalledTimes(2)
})


