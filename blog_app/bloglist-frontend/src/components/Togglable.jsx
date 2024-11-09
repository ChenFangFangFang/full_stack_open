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
        {typeof children === 'function' ? children(toggleVisibility) : children}
        <button onClick={toggleVisibility}>{closeLabel}</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  openLabel: PropTypes.string.isRequired,
  closeLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
}

export default Togglable
