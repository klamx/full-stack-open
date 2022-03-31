import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, clicker }) => {
  return <button onClick={clicker}>{text}</button>
}

const Statistic = ({ value, statistic }) => {
  return <p>{statistic}: {value}</p>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = ['good', 'neutral', 'bad']

  return (
    <div>
      <h3>Give feedback</h3>
      <div className='button_container'>
        <Button text="good" clicker={() => { setGood(prevGood => prevGood + 1) }}/>
        <Button text="neutral" clicker={() => { setNeutral(prevNeutral => prevNeutral + 1) }}/>
        <Button text="bad" clicker={() => { setBad(prevBad => prevBad + 1) }}/>
      </div>
      <div>
        <h3>statistics</h3>
        <Statistic statistic={statistics[0]} value={good}/>
        <Statistic statistic={statistics[1]} value={neutral}/>
        <Statistic statistic={statistics[2]} value={bad}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
