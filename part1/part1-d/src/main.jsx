import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './style.css'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>
  }
  return <div>button press history: {props.allClicks.join(' ')}</div>
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const Display = (props) => {
  return <div>{props.value}</div>
}

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
    <div className='container'>
      <div className='container__click__counter'>
        <div className='counter__block'>
          <Display value={left} />
          <Button onClick={handleLeftClick} text={'left'} />
        </div>
        <div className='counter__block'>
          <Button onClick={handleRightClick} text={'right'} />
          <Display value={right} />
        </div>
      </div>
      {/* <p>{allClicks.join(',')}</p> */}
      <div>
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
