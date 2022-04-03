import React, { useState } from 'react'

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
      <div>
        filter shown with
        <input type='text' onChange={filterShownData} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={changeNewName}
            placeholder='new contact'
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={changeNewNumber}
            placeholder='new number'
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => {
          return (
            <li key={person.number}>
              {person.name} -- {person.number}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
