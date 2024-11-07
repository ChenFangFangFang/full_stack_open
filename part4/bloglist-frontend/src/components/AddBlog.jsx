import blogService from '../services/blogs'

const AddBlog = ({ blogs, setBlogs, newBlog, setNewBlog, setNotificationMessage, setNotificationType, toggleVisibility }) => {
    const addBlog = async (event) => {
        event.preventDefault()
        try {
            const addedBlog = await blogService.create(newBlog)
            console.log('Added blog:', addedBlog) // Check what is returned
            setNotificationMessage(`A new blog ${newBlog.title} added`);
            setNotificationType('success');
            setTimeout(() => {
                setNotificationMessage(null);
                setNotificationType(null);
            }, 5000);
            setBlogs(blogs.concat(addedBlog)) // Update the blogs list with the new blog
            setNewBlog({ title: "", author: "", url: "" })
            toggleVisibility() // Clear the form fields
        } catch (exception) {
            console.log(exception)
            setNotificationMessage("Failed to add blog")
            setNotificationType('delete');
            setTimeout(() => setNotificationMessage(null), 5000)
        }
    }

    return (
        <div>
            <h2>Add a new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title:
                    <input
                        value={newBlog.title}
                        onChange={event => setNewBlog({ ...newBlog, title: event.target.value })}
                    />
                </div>
                <div>
                    Author:
                    <input
                        value={newBlog.author}
                        onChange={event => setNewBlog({ ...newBlog, author: event.target.value })}
                    />
                </div>
                <div>
                    Url:
                    <input
                        value={newBlog.url}
                        onChange={event => setNewBlog({ ...newBlog, url: event.target.value })}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}
export default AddBlog