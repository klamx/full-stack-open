import React from 'react'
import Parts from './Parts'
import Title from './Title'
import Total from './Total'

const Course = ({ course }) => {
  return (
    <div>
      <Title title={course.name} />
      <Parts parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
