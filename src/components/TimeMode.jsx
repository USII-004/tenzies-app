import React from 'react'
import TimeAttack from './TimeAttack';
import Dice from "./Dice";
import { nanoid } from 'nanoid'
import Start from "./Start";
import WonTime from './WonTime';
import FailedTime from './FailedTime';

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
    setTenzies(false);
    setDice(allNewDice());
    setRolls(1);
    setStart(false); // Set start to false first
    setTimeout(() => {
      setStart(true); // Set start to true after a short delay
      setSeconds(30);
    }, 100);
  }
  

  function startGame() {
    setDice(allNewDice())
    setRolls(1)
    setStart(true)  
    // setSeconds(30)
  }

  let timer;


  function handleTimer() {
    console.log(timer)
    // check if an interval has already been set up
    if (!timer) {
      timer = setInterval(handleCountdown, 1000);
    }
  }

  function handleCountdown() {
    setSeconds(prevTime => {
      if(prevTime > 0) {
        console.log('interval called')
        console.log(timer)
        prevTime--
      }else {
        /*console shows that this else statement was ran twice*/ 
        clearInterval(timer)
        timer = null /*reset timer to null, on count hitting zero*/
        console.log('interval cleared')
        console.log(timer)
      }

      return prevTime
    })
  } 
  

  function clearTimer() {
    clearInterval(timer)
    timer = null;
  }
  
  React.useEffect(() => {
    // Initialize the timer only if the game has started
    if (start) {
      handleTimer();
  
      // Cleanup function to clear the interval when the component is unmounted or when 'start' changes
      return () => {
        clearTimer();
        console.log('timer cleared on unmount or start change');
        console.log(timer);
      };
    } else {
      // If 'start' is false, clear the timer
      clearTimer();
      console.log('timer cleared on tenzies or start is false');
      console.log(timer);
    }
  }, [start]);
  

   


   if(start) {
    if (seconds > 0) {
      return (
        <TimeAttack 
          handleRoll={handleRoll}
          rolls={rolls}
          seconds={seconds}
          diceElement={diceElement}
        />
      )
    }else {
      return (
        <FailedTime 
          handleReset = {handleReset}
        />
      )
    }
   }else {
    if(tenzies) {
      return (
        <WonTime 
          seconds = {seconds}
          tenzies = {tenzies}
          rolls = {rolls}
          handleReset = {handleReset}
        />
      )
    }else {
      if(seconds > 0) {
        return (
          <Start 
            startGame = {startGame}
          />
        )
      }
    }
   }
}

export default TimeMode