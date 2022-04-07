import React, { useState, useEffect } from 'react'
import Note from './components/Note/Note'
import './App.css'
import notesService from './services/notes'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    notesService.getAll().then((response) => {
      setNotes(response)
    })
  }
  useEffect(hook, [])
  console.log('render', notes.length, 'notes')

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  const toggleImportanceOf = (id) => {
    // console.log('importance of ' + id + 'needs to be toggled')
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    notesService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((note) => (note.id !== id ? note : response)))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObj = {
      content: newNote,
      // id: prevNotes[prevNotes.length - 1].id + 1,
      id: notes.length + 1,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    notesService.create(noteObj).then((response) => {
      console.log(response)
      setNotes((prevNotes) => {
        return [...prevNotes, noteObj]
      })
      setNewNote('')
    })
  }

  const addNewNote = (event) => {
    setNewNote(event.target.value)
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button className='show-all' onClick={() => setShowAll(!showAll)}>
        {showAll ? 'important' : 'all'}
      </button>
      <ul className='notes'>
        {notesToShow.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )
        })}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={addNewNote}
          placeholder='new note...'
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App
