import React from 'react'
import TimeAttack from './TimeAttack';
import Dice from "./Dice";
import Confetti from 'react-confetti'
import { nanoid } from 'nanoid'
import Start from "./Start";

const TimeMode = () => {
  const [dice,setDice] = React.useState([])
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(1)
  const [seconds, setSeconds] = React.useState(30)
  const [start, setStart] = React.useState(false)

  React.useEffect( () => {
    if(dice.length > 0) {
      const allHeld = dice.every(item => item.isHeld)
      const firstValue = dice[0].value
      const sameDice = dice.every(item => item.value === firstValue)

      if(allHeld && sameDice) {
        setTenzies(true)  
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
    // setStart(true)
    // setSeconds(30)
  }

  function startGame() {
    setDice(allNewDice())
    setRolls(1)
    // setStart(true)

  }

  let timer;

  /* after timer was assigned for the countdown, it never defaults to null*/ 

  // function handleTimer() {
  //   console.log(timer)
  //   // check if an interval has already been set up
  //   if (!timer) {
  //     timer = setInterval(handleCountdown, 1000);
  //   }
  // }

  // function handleCountdown() {
  //   setSeconds(prevTime => {
  //     if(prevTime > 0 && !tenzies) {
  //       console.log('interval called')
  //       prevTime--
  //     }else {
  //       /*console shows that this else statement was ran twice*/ 
  //       clearInterval(timer)
  //       timer = null /*reset timer to null, on count hitting zero*/
  //       console.log('interval cleared')
  //     }

  //     return prevTime
  //   })
  // }

  /*the issue with the handle timer function is that as at the
  time it was called, tenzies was false, it assumes this as the
  case until the interval finishes it's count. so even when tenzies
  becomes true mid game, the countdown is cleared, but it is called
  again and the count continues */ 


  

  // function clearTimer() {
  //   clearInterval(timer)
  //   timer = null;
  // }
  
  // React.useEffect(() => {
  //   if(start && !tenzies) {
  //     handleTimer()
  //   }else {
  //     clearTimer()
  //     setStart(false)
  //     console.log('timer cleared on tenzies')
  //   }
  // }, [start, tenzies])

  /*even with the useEffect above which actively keeps 
  track of the start and tenzies state b4 calling the 
  handletimer function, the countdown still counts untill
   zero even when tenzies is true*/ 


  return (
    <div>
        {dice.length > 0
        ? 
        <TimeAttack 
          tenzies={tenzies}
          handleRoll={handleRoll}
          handleReset={handleReset}
          rolls={rolls}
          seconds={seconds}
          diceElement={diceElement}
          Confetti={Confetti}
        />
        :
        <Start 
          startGame = {startGame}
        />
        }
      </div>
  )
}

export default TimeMode