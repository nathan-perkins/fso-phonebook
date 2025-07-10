import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data)
     })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    const namesArray = persons.map(({ name }) => name)
    const numbersArray = persons.map(({ number }) => number)
    if (namesArray.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else if (numbersArray.includes(newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setSuccessMessage(
            `${personObject.name} was successfully added!`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (event) => {
    personService
      .remove(event.target.id)
      .then(() => {
        setPersons(persons)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter
    ? persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} onChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm 
        onSubmit={addPerson} nameValue={newName} nameChange={handleNameChange} numberValue={newNumber} numberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Notification message={successMessage} />

      <Persons personsToShow={personsToShow} onClick={removePerson} />
    </div>
  )
}

export default App