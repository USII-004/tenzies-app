import React from "react";
import { nanoid } from 'nanoid'
import Classic from "./components/Classic";
import Dice from "./components/Dice";
import Confetti from 'react-confetti'
import TimeAttack from "./components/TimeAttack";

function App() {

  const [dice,setDice] = React.useState([])
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(1)
  const [gameMode, setGameMode] = React.useState('')

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

  function handleClassic() {
    setGameMode('classic')
  }

  function handleTimeAttack() {
    setGameMode('time attack')
  }
  
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
    setTenzies(prevState => !prevState)
    setDice(allNewDice())
    setRolls(1)
  }

  function startGame() {
    setDice(allNewDice())
    setRolls(1)
  }


  if (gameMode === '') {
    return (
      <div className='md:w-[450px] w-full bg-[#0B2434] p-4 md:my-24 h-screen md:h-[450px]'>
        <div className="w-full bg-[#f5f5f5] h-[100%] rounded-md flex justify-center items-center flex-col px-10">
          <h2 className="my-2 text-2xl font-bold">Welcome to Tenzies</h2>
          <p className="font-bold">Do pick your game mode</p>
          <p className="my-2">Select classic mode to learn about the game and play with no rules.</p>
          <p>Select time attack mode if you are ready for some real challenge to race against time.</p>
          <button 
                className='bg-[#5035FF] px-10 py-2 rounded-md font-bold text-white my-2' 
                onClick={handleClassic}
            >
                Classic Mode
            </button>
            <button 
                className='bg-[#5035FF] px-10 py-2 rounded-md font-bold text-white my-2' 
                onClick={handleTimeAttack}
            >
                Time Attack
            </button>
        </div>
      </div>
    )
  } else if (gameMode === 'classic') {
    return (
      <div>
        { dice.length > 0 
        ?
        <Classic
          tenzies={tenzies}
          handleRoll={handleRoll}
          handleReset={handleReset}
          rolls={rolls}
          diceElement={diceElement}
          Confetti={Confetti}
          
        />
        :
        <div className='md:w-[450px] w-full bg-[#0B2434] p-4 md:my-24 h-screen md:h-[450px]'>
          <div className="w-full bg-[#f5f5f5] h-[100%] rounded-md flex justify-center items-center flex-col px-10">
            <h1 className="text-3xl font-bold">Tenzies</h1>
            <h2 className="m-4 text-xl font-bold">Want to test your luck?</h2>
            <p>Your goal is to get all the dice to hold the same number in the smallest possible rolls.</p>
            <p className="my-2">Click the button below to start the game and roll, Click each die to freeze it at its current value between rolls</p>
            <button 
                className='bg-[#5035FF] px-10 py-2 rounded-md font-bold text-white my-2' 
                onClick={startGame}
            >
                Start Game
            </button>
          </div>
        </div>
      
      }
      </div>
            
  );
  } else {
    return (
      <TimeAttack 
        tenzies={tenzies}
        handleRoll={handleRoll}
        handleReset={handleReset}
        rolls={rolls}
        diceElement={diceElement}
        Confetti={Confetti}
      />
    )
  }
}

export default App;


