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

const Statistics = ({ good, neutral, bad, names }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good * 100) / all

  if (all > 0) {
    return (

      <div>
        <Statistic statistic={names[0]} value={good} />
        <Statistic statistic={names[1]} value={neutral} />
        <Statistic statistic={names[2]} value={bad} />
        <p>All: {all}</p>
        <p>Average: {average}</p>
        <p>Positive: {positive} %</p>
      </div>
    )
  }
  return (

    <div>
      <p>No feedback given</p>
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

        <Statistics good={good} neutral={neutral} bad={bad} names={statistics}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
