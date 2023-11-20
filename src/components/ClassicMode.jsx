import React from 'react'
import Classic from './Classic'
import Dice from "./Dice";
import { nanoid } from 'nanoid'
import Start from "./Start";
import FinishClassic from './FinishClassic';


const ClassicMode = () => {
  const [dice,setDice] = React.useState([])
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(1)
  const [start, setStart] = React.useState(false)

  React.useEffect( () => {
    if(dice.length > 0) {
      const allHeld = dice.every(item => item.isHeld)
      const firstValue = dice[0].value
      const sameDice = dice.every(item => item.value === firstValue)

      if(allHeld && sameDice) {
        setTenzies(true)
        setStart(prevState => !prevState)  
      }

    }
  }, [dice] 
  )

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
    }

    return newDice
  }

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
      // Math.floor(Math.random() * (6)) + 1
      /*
        Math.floor creates a random number from 0 to the specified number 
        Math.ceil creates a random number from 1 to the specified number
      */ 
    }
  }

  const diceElement = dice.map(item => {
    return <Dice
      key={item.id} 
      value={item.value}
      isHeld={item.isHeld}
      handleClick={() => toggleHold(item.id)}  
      />
  }
  )

  function toggleHold(id) {
    setDice(prevDice => prevDice.map(item => {
      return item.id === id ? {...item, isHeld: !item.isHeld} : item
    }))
  }


  function handleRoll() {
    setDice(prevDice => prevDice.map(item => {
      return item.isHeld ? item : generateNewDice()
    }))
    setRolls(prevState => prevState + 1)
  }


  function handleReset() {
    setTenzies(false)
    setDice(allNewDice())
    setRolls(1)
    setStart(prevState => !prevState)
    // setStart(true)
    // setSeconds(30)
  }

  function startGame() {
    setDice(allNewDice())
    setRolls(1)
    setStart(prevState => !prevState)
    // setStart(true)

  }

  if (start) {
    return (
      <Classic
      handleRoll={handleRoll}
      rolls={rolls}
      diceElement={diceElement}
      
    />
    )
  }else {
    if(tenzies) {
      return (
        <FinishClassic 
          handleReset = {handleReset}
          rolls = {rolls}
          tenzies = {tenzies}
        />
      )
    }else {
      return (
        <Start 
        startGame = {startGame}
      />
      )
    }
  }

}

export default ClassicMode