import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, clicker }) => {
  return <button onClick={clicker}>{text}</button>
}

const Statistic = ({ value, statistic }) => {
  return (
    <tr>
      <td>{statistic}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, names }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good * 100) / all
  const statisticsNames = [...names, 'All', 'average', 'positive']

  if (all > 0) {
    return (
      <tbody>
        <Statistic statistic={statisticsNames[0]} value={good} />
        <Statistic statistic={statisticsNames[1]} value={neutral} />
        <Statistic statistic={statisticsNames[2]} value={bad} />
        <Statistic statistic={statisticsNames[3]} value={all} />
        <Statistic statistic={statisticsNames[4]} value={average} />
        <Statistic statistic={statisticsNames[5]} value={positive} />
      </tbody>
    )
  }
  return (
    <tbody>
      <tr>
        <td>No feedback given</td>
      </tr>
    </tbody>
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
        <table>
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            names={statistics}
          />
        </table>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
