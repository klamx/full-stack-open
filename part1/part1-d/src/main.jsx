import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // const [clicks, setClicks] = useState({ left: 0, right: 0 })
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAllClicks] = useState([])

  const handleLeftClick = () => {
    setLeft((prevLeft) => prevLeft + 1)
    setAllClicks((prevAll) => [...prevAll, 'L'])
  }

  const handleRightClick = () => {
    setRight((prevRight) => prevRight + 1)
    setAllClicks((prevAll) => [...prevAll, 'R'])
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(',')}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
