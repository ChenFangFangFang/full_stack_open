import Togglable from "./Togglable"

const Blog = ({ blog }) => (
  <div>
    <h3>{blog.title} </h3>
    <Togglable openLabel="Show" closeLabel="Hide">
      {() => (
        <div>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button >Like</button></p>
          <p>{blog.author}</p>
        </div>
      )}
    </Togglable>
  </div>
)

export default Blog