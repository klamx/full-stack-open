import React from 'react'

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make no important' : 'make important'
  return (
    <li className='note' key={note.id}>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
