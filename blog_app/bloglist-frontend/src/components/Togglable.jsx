import { useState } from 'react'

const Togglable = ({ openLabel, closeLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <button onClick={toggleVisibility}>
        {visible ? closeLabel : openLabel}
      </button>
      {visible && (
        <div className="togglableContent">
          {children(toggleVisibility)}
        </div>
      )}
    </div>
  )
}

export default Togglable
