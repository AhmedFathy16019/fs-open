const LoginForm = ({ onSubmit, username, changeUsername, password, changePassword }) => {
    return (
        <div>
            <h2>Log in to the application</h2>
            <form onSubmit={ onSubmit }>
                <div>
                    username
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={ username }
                        onChange={({ target }) => changeUsername(target.value)}
                    />
                </div>

                <div>
                    password
                    <input
                        id="password"
                        type="text"
                        name="password"
                        value={ password }
                        onChange={({ target }) => changePassword(target.value)}
                    />
                </div>

                <button type="submit" id="login-button">login</button>
            </form>
        </div>
    )
}

export default LoginForm