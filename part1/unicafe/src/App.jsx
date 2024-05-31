import { useState } from 'react'
const Header = () => <h1>give feedback</h1>
const Result = () => <h1>statistics</h1>

const  Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)
const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good,neutral,bad,total}) => {
  if (total === 0){
    return (
      <div><p>No feedback given</p></div>
    )
  }
  else{
    const average = (good * 1 + bad * (-1) + neutral * 0) / total
    const positive = ((good / total) * 100)
    return (
  
      <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="All" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive} %`}  />
      </tbody>
      </table>
   
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)

  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + good + neutral)
  }

  return (
    <div>
    <Header />  
    <Button handleClick={handleGoodClick} text="good" />
    <Button handleClick={handleNeutralClick} text="neutral" />
    <Button handleClick={handleBadClick} text="bad" />
    <Result />
    <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  
  )
}

export default App