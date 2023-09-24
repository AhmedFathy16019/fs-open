import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Notes from './components/Note'

const App = () => {
  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to={'/'}>home</Link>
        <Link style={padding} to={'/notes'}>notes</Link>
        <Link style={padding} to={'/users'}>users</Link>
      </div>

      <Routes>
        <Route path='/' element={<Notes/>} />
      </Routes>
    </Router>
  )
}