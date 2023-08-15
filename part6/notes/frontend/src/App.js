import NewNote from './components/NewNote'
import Notes from './components/Note'
import VisibilityFilter from './components/VisibilityFilter'
import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeNotes())
    }, [dispatch])

    return (
        <div>
            <NewNote />
            <VisibilityFilter />
            <Notes />
        </div>
    )
}

export default App