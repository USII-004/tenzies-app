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
  const [storedHighestSeconds, setStoredHighestSeconds] = React.useState(null)
  const [storedBestRoll, setStoredBestRoll] = React.useState(null)

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

  // get soconds and rolls  from local storage

  React.useEffect(() => {
    const storedSeconds = localStorage.getItem('highestSeconds')
    const storedRoll = localStorage.getItem('bestRoll')

    if(storedSeconds !== null) {
      setStoredHighestSeconds(parseInt(storedSeconds, 10));
    }

    if(storedRoll !== null) {
      setStoredBestRoll(parseInt(storedRoll, 10));
    }
  }, []);

  // save seconds and rolls to local storage when the game is completed

  React.useEffect(() => {
    if(tenzies) {
      const storedHighestSeconds = localStorage.getItem('highestSeconds')
      const storedBestRoll = localStorage.getItem('bestRoll')

      if ((!storedHighestSeconds || seconds >= parseInt(storedHighestSeconds, 10)) && (!storedBestRoll || rolls <= parseInt(storedBestRoll, 10))) {
        localStorage.setItem('highestSeconds', seconds);
        setStoredHighestSeconds(seconds)

        localStorage.setItem('bestRoll', rolls);
        setStoredBestRoll(rolls)
      }
    }
  }, [tenzies, seconds, rolls])



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


  const timerRef = React.useRef(null);

  /*ESLint warning suggests that assignments to the timer 
  variable inside the React.useCallback will be lost after 
  each render. To address this, I used the useRef hook to 
  create a mutable object that persists across renders and 
  modification won't be lost.*/ 


  const handleTimer = React.useCallback(() => {
    if (!timerRef.current) {
      timerRef.current = setInterval(handleCountdown, 1000);
    }
  }, [])

  const clearTimer = React.useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = null;
  }, [])

  /*I fixed the ESLint warnings you're seeing are related to the
   fact that handleTimer and clearTimer functions are defined 
   outside the useEffect callback, and they are referenced inside 
   the useEffect dependency array. By wrapping handleTimer and 
   clearTimer with useCallback, I memoize these functions and 
   ensure they won't change on every render. This resolves the 
   ESLint warnings about changing dependencies in the useEffect 
   dependency array.*/ 

  function handleCountdown() {
    setSeconds(prevTime => {
      if(prevTime > 0) {
        prevTime--
      }else {
        /*console shows that this else statement was ran twice*/ 
        clearInterval(timerRef.current)
        timerRef.current = null /*reset timer to null, on count hitting zero*/
      }

      return prevTime
    })
  } 
  

  // eslint-disable-next-line
  React.useEffect(() => {
    // Initialize the timer only if the game has started
    if (start) {
      handleTimer();
  
      // Cleanup function to clear the interval when the component is unmounted or when 'start' changes
      return () => {
        clearTimer();
      };
    } else {
      // If 'start' is false, clear the timer
      clearTimer();
    }
  }, [start, clearTimer, handleTimer]);

  /*included clearTimer and handleTimer in the dependency array
  ESLint expects you to include all the variables and functions
  from the component scope that are used inside the useEffect in
  the dependency array to ensure that the effect has access to 
  the latest values of those dependencies. */ 
  

   


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
          fastestTime = {storedHighestSeconds}
          bestRoll = {storedBestRoll}
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