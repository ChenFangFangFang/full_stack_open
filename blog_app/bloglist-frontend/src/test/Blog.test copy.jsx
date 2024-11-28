import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'blog-test',
  }

  const { container } = render(<Blog blog={blog} />)

  //   screen.debug()
  screen.debug(element)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('blog-test')
})
