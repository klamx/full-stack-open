import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, clicker }) => {
  return <button onClick={clicker}>{text}</button>
}

const Statistic = ({ value, statistic }) => {
  return (
    <p>
      {statistic}: {value}
    </p>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good * 100) / all

  return (
    <div>
      <p>All: {all}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive} %</p>
    </div>
  )
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
        <Button
          text='good'
          clicker={() => {
            setGood((prevGood) => prevGood + 1)
          }}
        />
        <Button
          text='neutral'
          clicker={() => {
            setNeutral((prevNeutral) => prevNeutral + 1)
          }}
        />
        <Button
          text='bad'
          clicker={() => {
            setBad((prevBad) => prevBad + 1)
          }}
        />
      </div>
      <div>
        <h3>statistics</h3>
        <Statistic statistic={statistics[0]} value={good} />
        <Statistic statistic={statistics[1]} value={neutral} />
        <Statistic statistic={statistics[2]} value={bad} />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
