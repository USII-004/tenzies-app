import React from 'react'

const Classic = (props) => {
  
  return (
    <div>
      <main className="md:w-[450px] w-full bg-[#0B2434] p-4 md:my-24 h-screen md:h-[450px]">
          {props.tenzies && <props.Confetti />}
          <div className="w-full bg-[#f5f5f5] h-[100%] rounded-md flex justify-around items-center flex-col px-10">
            <div className="flex flex-col items-center justify-center">
              <h2 className="my-4 text-2xl font-bold">Tenzies</h2>
              {!props.tenzies
              ? <p>Roll untill all dice are the same. Click each die to freeze it at its current value between rolls</p> 
              : <p>Hurray!! you won in {props.rolls} rolls, think you can do better?... Start a new game and try your luck again.</p>
              }
              
            </div>
            <div className="grid grid-cols-5">
              {props.diceElement}
            </div>
            <div className="flex items-center justify-center py-4">
              {!props.tenzies
                ? <button
                    onClick={props.handleRoll} 
                    className="bg-[#5035FF] px-10 py-2 rounded-md font-bold text-white"
                  >
                    Roll
                  </button>
                : <button
                    onClick={props.handleReset} 
                    className="bg-[#5035FF] px-10 py-2 rounded-md font-bold text-white"
                  >
                    New Game
                  </button>
              }
            </div>
            <p className="font-bold">Rolls: {props.rolls}</p>
          </div>
        </main>
    </div>
  )
}

export default Classic