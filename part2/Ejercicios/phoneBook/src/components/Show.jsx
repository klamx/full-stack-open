import React from 'react'

const Show = ({ personsToShow, personToDelete }) => {
  return (
    <ul>
      {personsToShow.map((person) => {
        return (
          <li key={person.number}>
            {person.name} -- {person.number}
            <button onClick={() => personToDelete(person.id)}>Delete</button>
          </li>
        )
      })}
    </ul>
  )
}

export default Show
