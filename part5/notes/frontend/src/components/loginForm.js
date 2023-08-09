import { useState } from "react"
import PropTypes from 'prop-types'

const LoginForm = ({loginService}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()

    const credentials = { username, password }

    loginService(credentials)
    
    setUsername('')
    setPassword('')
  }  

  return (
    <form onSubmit={login}>
      
      <div>
        username
          <input
            id="username"
            type='text'
            value={username}
            onChange={({target}) => setUsername(target.value)} 
          />
      </div>
      
      <div>
        password
          <input
            id="password"
            type='password'
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
      </div>
     
      <button id="login-button" type='submit'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  loginService: PropTypes.func.isRequired
}

export default LoginForm