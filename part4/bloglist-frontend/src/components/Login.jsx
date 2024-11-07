import loginService from "../services/login"
import blogService from '../services/blogs'

const Login = ({ username, password, setUser, setUsername, setPassword, setNotificationMessage, setNotificationType, }) => {

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loddedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setNotificationMessage('Wrong username or password');
            setNotificationType('delete');
            setTimeout(() => {
                setNotificationMessage(null);
                setNotificationType(null);
            }, 5000);
        }
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type='text'
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login