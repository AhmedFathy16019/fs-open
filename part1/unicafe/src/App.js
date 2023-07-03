import { useState } from "react";

const Display = ({text}) => {
  return <h1>{text}</h1>
}

const StatisticLine = ({type, value}) => {
  return(
    <tr>
      <td>{type}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (all){
    return(
        <table>
          <tbody>
            <StatisticLine type='good' value={good} />
            <StatisticLine type='neutral' value={neutral} />
            <StatisticLine type='bad' value={bad} />
            <StatisticLine type='all' value={all} />
            <StatisticLine type='average' value={average} />
            <StatisticLine type='positive' value={positive} />
          </tbody>
        </table>
    )
  } else{
    return <p>no feedback given</p>
  }
}

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    let updatedGood = good + 1;
    let updatedAll = all + 1;
    let updatedAverage = (updatedGood - bad) / updatedAll;
    let updatedPositive = updatedGood / updatedAll;
    setGood(updatedGood);
    setAll(updatedAll)
    setAverage(updatedAverage)
    setPositive(updatedPositive)  }

  const handleNeutral = () => {
    let updatedAll = all + 1;
    let updatedAverage = (good - bad) / updatedAll;
    let updatedPositive = good / updatedAll;
    setNeutral(neutral+1)
    setAll(updatedAll)
    setAverage(updatedAverage)
    setPositive(updatedPositive)
  }

  const handleBad = () => {
    let updatedBad = bad+1
    let updatedAll = all + 1;
    let updatedAverage = (good - updatedBad) / updatedAll;
    let updatedPositive = good / updatedAll;
    setBad(updatedBad)
    setAll(updatedAll)
    setAverage(updatedAverage)
    setPositive(updatedPositive)  }

  return (
    <div>
      <Display text='give feedback'/>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Display text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad}
      all={all} average={average} positive={positive} />
    </div>
  )
}

export default App;
