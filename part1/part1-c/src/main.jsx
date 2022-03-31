import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Hello = ({ name, age }) => {
  const bornYear = () => {
    return new Date().getFullYear() - age
  }

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)

  const add = () => {
    setCounter((prevCont) => prevCont + 1)
  }

  setTimeout(() => setCounter((prevCont) => prevCont + 1), 1000)
  return (
    <div>
      {counter}
      <button onClick={add}>add</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
