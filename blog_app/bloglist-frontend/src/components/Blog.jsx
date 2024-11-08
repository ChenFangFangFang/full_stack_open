import Togglable from "./Togglable"

const Blog = ({ blog, handleAddLike, handleDeleteBlog }) => (
  <div>
    <h3>{blog.title} </h3>
    <Togglable openLabel="Show" closeLabel="Hide">
      {() => (
        <div>
          <p>{blog.url}</p>
          <p>
            likes: {blog.likes} <button onClick={() => handleAddLike(blog)}>Like</button>
          </p>
          <p>{blog.author}</p>
          <button onClick={() => handleDeleteBlog(blog)}>Delete</button>
        </div>
      )}
    </Togglable>
  </div>
)

export default Blog