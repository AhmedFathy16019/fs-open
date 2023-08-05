import { useState } from "react"

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
            type='text'
            value={username}
            name='Username'
            onChange={({target}) => setUsername(target.value)} 
          />
      </div>
      
      <div>
        password
          <input
            type='text'
            value={password}
            name='Password'
            onChange={({target}) => setPassword(target.value)}
          />
      </div>
     
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm