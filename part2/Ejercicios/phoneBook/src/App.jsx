import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Show from './components/Show'
import personsService from './services/persons'

function App () {
  const [persons, setPersons] = useState([])
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
        return person.name.toLowerCase() === newName.toLowerCase()
      }) &&
      !persons.find((person) => {
        return person.number === newNumber
      })
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the odl number whit a new one?`
        )
      ) {
        const per = persons.find(
          (e) => e.name.toLowerCase() === newName.toLowerCase()
        )
        const newPerson = { name: per.name, number: newNumber }
        personsService.update(per.id, newPerson).then((response) => {
          setPersons(
            persons.map((person) => {
              return person.id !== response.id ? person : response
            })
          )
        })
        return
      }
    } else if (
      persons.find((person) => {
        return person.name.toLowerCase() === newName.toLowerCase()
      })
    ) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }

    personsService
      .create(newPerson)
      .then((response) => setPersons([...persons, response]))
      .catch((error) => console.log(error))
    // setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
    setNewNumber('')
  }

  const personToDelete = (id) => {
    if (
      !window.confirm(
        `desea eliminar a ${persons.find((e) => e.id === id).name}`
      )
    ) {
      return
    }
    personsService
      .deleted(id)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
    setPersons(persons.filter((person) => person.id !== id))
  }

  useEffect(() => {
    personsService.getAll().then((response) => setPersons(response))
  }, [])

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
      <Show personsToShow={personsToShow} personToDelete={personToDelete} />
    </div>
  )
}

export default App
