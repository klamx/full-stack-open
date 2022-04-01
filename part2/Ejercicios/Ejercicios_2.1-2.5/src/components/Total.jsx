import React from 'react'

const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => {
    return a + b.exercises
  }, 0)
  return <b>total of {total} exercises</b>
}

export default Total
