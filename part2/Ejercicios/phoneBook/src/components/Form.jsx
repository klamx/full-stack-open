import React from 'react'

const Form = ({
  newName,
  changeNewName,
  newNumber,
  changeNewNumber,
  addPerson
}) => {
  return (
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
  )
}

export default Form
