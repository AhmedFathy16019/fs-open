import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'

import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)
  const [personsToShow, setPersonsToShow] = useState(persons)

  const hook = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }

  useEffect(hook, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const duplicate = persons.find(obj => obj.name === newName)
    console.log('newName', newName)
    console.log('duplicate', duplicate)
    if (duplicate){
      if (window.confirm(`${newName} is already an entry in the phonebook, replace the old number with the new one?`)){
        const changedPerson = persons.find(person => person.name === newName)
        changedPerson.number = newNumber
        personService
          .update(changedPerson)
          .then(changedPerson => {
            console.log('entered then');
            setPersons(persons.map(person => person.name !== newName ? person : changedPerson))
            setNewName('')
            setNewNumber('')
            setNotification(`Updated ${newName}'s number`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            console.log('error', error.response.data.error)
            setError(`Error: ${error.response.data.error}`)
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
      } 
    } else{
      const personObject = { name: newName, number: newNumber}
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${newName}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error, error.response.data.error);
          setError(`Error: ${error.response.data.error}`)
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    }
  }

  const removePerson = (event, id) => {
    event.preventDefault()
    console.log(id)
    const name = persons.find(person => person.id === id).name
    console.log('name', name)
    if(window.confirm(`Delete ${name}?`)){
      personService
        .remove(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    const filterInput = event.target.value
    setFilterName(filterInput)
    const tempToShow = persons.filter(person => person.name.toLowerCase().includes(filterInput.toLowerCase()))
    setPersonsToShow(tempToShow)
  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter value={filterName} handleChange={handleChangeFilter} />
      <h3>add a new entry</h3>
      <PersonForm 
        valueName={newName} valueNumber={newNumber}
        handleName={handleChangeName} handleNumber={handleChangeNumber}
        click={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={filterName ? personsToShow : persons} handleClick={removePerson}/>
    </div>
  )
}

export default App