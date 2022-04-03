import React, { useState } from 'react'

function App () {
  const [persons, setPersons] = useState([{ name: 'jhon doe' }])
  const [newName, setNewName] = useState('')

  const changeNewName = (e) => {
    setNewName(e.target.value)
  }
  const addPerson = (e) => {
    e.preventDefault()
    setPersons((prevPersons) => [...prevPersons, { name: newName }])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={changeNewName}
            placeholder='new contact'
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          return <li key={persons.length + 1}>{person.name}</li>
        })}
      </ul>
    </div>
  )
}

export default App
