import React from "react";
import Dice from "./components/Dice";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice,setDice] = React.useState([])
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(1)

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

  function toggleHold(id) {
    setDice(prevDice => prevDice.map(item => {
      return item.id === id ? {...item, isHeld: !item.isHeld} : item
    }))
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



  return (
      <div>
        { dice.length > 0 
        ?
        <main className="md:w-[450px] w-full bg-[#0B2434] p-4 md:my-24 h-screen md:h-[450px]">
          {tenzies && <Confetti />}
          <div className="w-full bg-[#f5f5f5] h-[100%] rounded-md flex justify-around items-center flex-col px-10">
            <div className="flex flex-col items-center justify-center">
              <h2 className="my-4 text-2xl font-bold">Tenzies</h2>
              {!tenzies
              ? <p>Roll untill all dice are the same. Click each die to freeze it at its current value between rolls</p> 
              : <p>Hurray!! you won in {rolls} rolls, think you can do better?... Start a new game and try your luck again.</p>
              }
              
            </div>
            <div className="grid grid-cols-5">
              {diceElement}
            </div>
            <div className="flex items-center justify-center py-4">
              {!tenzies
                ? <button
                    onClick={handleRoll} 
                    className="bg-[#5035FF] px-10 py-2 rounded-md font-bold text-white"
                  >
                    Roll
                  </button>
                : <button
                    onClick={handleReset} 
                    className="bg-[#5035FF] px-10 py-2 rounded-md font-bold text-white"
                  >
                    New Game
                  </button>
              }
            </div>
            <p className="font-bold">Rolls: {rolls}</p>
          </div>
        </main>
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
}

export default App;


