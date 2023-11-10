import React from "react";
import Dice from "./components/Dice";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice,setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect( () => {
    const allHeld = dice.every(item => item.isHeld)
    const firstValue = dice[0].value
    const sameDice = dice.every(item => item.value === firstValue)

    if(allHeld && sameDice) {
      setTenzies(true)
      console.log('You Won!!')
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
  }

  function handleReset() {
    setTenzies(prevState => !prevState)
    setDice(allNewDice())
  }


  return (
    <main className="w-full bg-[#0B2434] h-screen p-4">
      {tenzies && <Confetti />}
      <div className="w-full bg-[#f5f5f5] h-[100%] rounded-md flex justify-around items-center flex-col px-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-bold text-2xl my-4">Tenzies</h2>
          <p>Roll untill all dice are the same. Click each die to freeze it at its current value between rolls</p>
        </div>
        <div className="grid grid-cols-5">
          {diceElement}
        </div>
        <div className="flex justify-center items-center py-4">
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
      </div>
    </main>
  );
}

export default App;
