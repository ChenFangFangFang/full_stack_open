import { useState } from 'react'
import PropTypes from 'prop-types'
const Togglable = ({ openLabel, closeLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{openLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children(toggleVisibility)}
        <button onClick={toggleVisibility}>{closeLabel}</button>
      </div>
    </div>
  )
}
Togglable.propTypes = {
  openLabel: PropTypes.string.isRequired, // openLabel must be a string and required
  closeLabel: PropTypes.string.isRequired, // closeLabel must be a string and required
  children: PropTypes.func.isRequired // children must be a function and required
}

export default Togglable
