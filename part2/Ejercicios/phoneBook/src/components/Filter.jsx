import React from 'react'

const Filter = ({ filterShownData }) => {
  return (
    <div>
      filter shown with
      <input type='text' onChange={filterShownData} />
    </div>
  )
}

export default Filter
