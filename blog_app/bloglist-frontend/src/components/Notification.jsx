const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    padding: '10px',
    color: type === 'delete' ? 'red' : 'green', // Set color based on type
    backgroundColor: type === 'delete' ? '#fdd' : '#dfd', // Light red or green background
    border: `1px solid ${type === 'delete' ? 'red' : 'green'}`,
    borderRadius: '5px',
    marginBottom: '15px'
  }

  return (
    <div style={notificationStyle} className="error">
      {message}
    </div>
  )
}

export default Notification