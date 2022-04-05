import React, { useState, useEffect } from 'react'
import Note from './components/Note/Note'
import './App.css'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios.get('http://localhost:3001/notes').then((response) => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
  }
  useEffect(hook, [])
  console.log('render', notes.length, 'notes')

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObj = {
      content: newNote,
      // id: prevNotes[prevNotes.length - 1].id + 1,
      id: notes.length + 1,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    axios.post('http://localhost:3001/notes', noteObj).then((response) => {
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
      <button className='show-all' onClick={() => setShowAll(!showAll)}>
        {showAll ? 'important' : 'all'}
      </button>
      <ul className='notes'>
        {notesToShow.map((note) => {
          return <Note key={note.id} note={note} />
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
