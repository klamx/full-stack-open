import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Show from './components/Show'
import Notification from './components/Notification'
import personsService from './services/persons'
import './style.css'

function App () {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [message, setMessage] = useState(null)
  const colors = ['#00af00', '#ff1110']
  const [color, setColor] = useState(colors[0])

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
          `${newName} is already added to phonebook, replace the old number whit a new one?`
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
        setColor(colors[0])
        setMessage('Number updated')
        setTimeout(() => {
          setMessage(null)
          setColor(colors[0])
        }, 3000)
        return
      }
    } else if (
      persons.find((person) => {
        return person.name.toLowerCase() === newName.toLowerCase()
      })
    ) {
      setColor(colors[1])
      setMessage(`${newName} is already added to phonebook`)
      setTimeout(() => {
        setMessage(null)
        setColor(colors[0])
      }, 3000)
      return
    }

    const newPerson = { name: newName, number: newNumber }

    personsService
      .create(newPerson)
      .then((response) => setPersons([...persons, response]))
      .catch((error) => console.log(error))
    // setPersons([...persons, { name: newName, number: newNumber }])
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
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
      .catch(() => {
        setPersons(persons.filter((person) => person.id !== id))
        setColor(colors[1])
        setMessage(`${persons.find((e) => e.id === id).name} has already been removed from server`)
        setTimeout(() => {
          setMessage(null)
          setColor(colors[0])
        }, 3000)
      })
    setPersons(persons.filter((person) => person.id !== id))
    setColor(colors[0])
    setMessage(`${persons.find((e) => e.id === id).name} was removed`)
    setTimeout(() => {
      setMessage(null)
      setColor(colors[0])
    }, 3000)
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
      <Notification message={message} color={color} />
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
