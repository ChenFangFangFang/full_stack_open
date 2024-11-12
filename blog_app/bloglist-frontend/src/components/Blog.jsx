import React, { useState } from 'react'
import PropTypes from 'prop-types'
import userStorage from '../services/userStorage'

const Blog = ({ blog,handleAddLike,handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }
  const allowDelete = blog.user ? blog.user.username === userStorage.me() : true
  console.log(blog.user, userStorage.me(), allowDelete)

  return (
    <div style={style} className='blog'>
      {blog.title} Author: {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'Hide' : 'View'}
      </button>
      {visible && (
        <div>
          <div>Link: {blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button
              style={{ marginLeft: 3 }}
              onClick={() => handleAddLike(blog)}
            >
              Like
            </button>
          </div>
          <div>{nameOfUser}</div>
          {allowDelete && <button onClick={() => handleDelete(blog)}>
            Delete
          </button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object,
  }).isRequired,
  handleAddLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog