import React, { useState } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Show from './components/Show'

function App () {
  const [persons, setPersons] = useState([
    { name: 'Jhon doe', number: '301' },
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const changeNewName = (e) => {
    setNewName(e.target.value)
  }

  const changeNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const filterShownData = (e) => {
    setFilterValue(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    if (
      persons.find((person) => {
        return person.number === newNumber
      })
    ) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }
    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
    setNewName('')
  }

  const personsToShow =
    filterValue !== ''
      ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterValue.toLowerCase())
      )
      : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterShownData={filterShownData} />
      <h2>Add a new</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        changeNewName={changeNewName}
        changeNewNumber={changeNewNumber}
      />
      <h2>Numbers</h2>
      <Show personsToShow={personsToShow} />
    </div>
  )
}

export default App
