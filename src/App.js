import { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [chosenNum, setChosenNum] = useState(0)
  const [endGame, setEndGame] = useState(0)
  const [tries, trackTries] = useState(1)
  const [windowDimensions, setWindowDimensions] = useState(window.innerWidth)
  const [pText, setPText] = useState("Roll until all dice are the same. Click each die to freeze it at its current value between rolls.")
  const [playAgain, setPlayAgain] = useState(false)
  const [diceArray, setDiceArray] = useState(new Array(windowDimensions < 1500 ? 8 : 10).fill(null).map(() => {
    return {
      id:nanoid(),
      num:Math.floor(Math.random() * 6 + 1),
      chosen:false,
      value:""
    }
  }))

  window.addEventListener("resize", () => {
    setWindowDimensions(window.innerWidth)
  })

  useEffect(() => {
      chosenNum === 0 && diceArray.map(die => {
        die.chosen && setChosenNum(die.num)
      })
  },[dieClick, diceArray])

  function dieClick(event) {
    console.log(event.target);
    setDiceArray(prevDice => prevDice.map( dice => {
      if (chosenNum === 0 || chosenNum == event.target.getAttribute("value")) {
        if (dice.id === event.target.getAttribute("name")) {
          setEndGame(endGame + 1)
          return {...dice, chosen:true, value:event.target.getAttribute("value")}
        } else {
          return dice
        }
      } else {
        return dice
      }
    }))
    if (windowDimensions < 1500 && endGame == 7 ) {
      setPlayAgain(true)
      setPText(`You won in ${tries} tries!`)
      console.log(`CONFETTI!!!! ${tries}`)
    } else if (windowDimensions > 1500 && endGame == 9 ) {
      setPlayAgain(true)
      setPText(`You won in ${tries} tries!`)
      console.log(`CONFETTI!!!! ${tries}`)
    }
  }

  function buttonClick() {
    trackTries(tries + 1)
    setDiceArray(prevDice => prevDice.map(dice => {
      return !dice.chosen ? 
      {...dice, num:Math.floor(Math.random() * 6 + 1)} :
      dice
    }))
  }

  function newGame() {
    setPlayAgain(false)
    setChosenNum(0)
    setEndGame(0)
    trackTries(1)
    setPText("Roll until all dice are the same. Click each die to freeze it at its current value between rolls.")
    setDiceArray(prevDice => {
      return prevDice.map(() => {
        return {      
          id:nanoid(),
          num:Math.floor(Math.random() * 6 + 1),
          chosen:false,
          value:""}
      })
    })
  }

  return (
      <main className="main">
      {playAgain && <Confetti/>}
        <div className="main--container">
          <h1>{windowDimensions > 1500 ? "Tenzies" : "Eightzies"}</h1>
          <p>{pText}</p>
          <div className="dices">
            {diceArray.map((dice) => {
              return (
                <div className={`dice ${dice.chosen && "chosen-dice"}`} onClick={dieClick} name={dice.id} value={dice.num}>{dice.num}</div>
              )
            })}
          </div>
          <button className="btn rollBtn" style={{display: playAgain ? "none" : "inline"}} onClick={buttonClick}>Roll</button>
          <button className="btn playAgainBtn" style={{display: !playAgain ? "none" : "inline"}}  onClick={newGame}>Play Again</button>
        </div>
      </main>
  );
}

export default App;
