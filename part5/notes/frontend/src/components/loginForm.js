const LoginForm = ({onSubmit, changeUsername, changePassword, username, password}) => {
  return (
    <form onSubmit={onSubmit}>
      
      <div>
        username
          <input 
            type='text'
            value={username}
            name='Username'
            onChange={({target}) => changeUsername(target.value)} 
          />
      </div>
      
      <div>
        password
          <input
            type='text'
            value={password}
            name='Password'
            onChange={({target}) => changePassword(target.value)}
          />
      </div>
     
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm