import React from 'react'

const Show = ({ personsToShow }) => {
  return (
    <ul>
      {personsToShow.map((person) => {
        return (
          <li key={person.number}>
            {person.name} -- {person.number}
          </li>
        )
      })}
    </ul>
  )
}

export default Show
