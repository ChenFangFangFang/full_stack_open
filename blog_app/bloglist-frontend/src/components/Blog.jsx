import Togglable from './Togglable'

const Blog = ({ blog, handleAddLike, handleDelete }) => (
  <div className="blog">
    <h3>{blog.title} </h3>
    <p>Author: {blog.author}</p>

    <Togglable openLabel="Show" closeLabel="Hide">
      {() => (
        <div><p>
      likes: {blog.likes}
          <button className = "likeBlog" onClick={() => handleAddLike(blog)}>Like</button>
        </p>
        <p>{blog.url}</p>
        <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </Togglable>
  </div>
)

export default Blog
