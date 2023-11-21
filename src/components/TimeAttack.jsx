import React from 'react'

const TimeAttack = (props) => {
  
  return (
    <div>
      <main className="md:w-[450px] w-full bg-[#0B2434] p-4 md:my-24 h-screen md:h-[450px]">
        <div className="w-full bg-[#f5f5f5] h-[100%] rounded-md flex justify-around items-center flex-col px-10">
          <div className="flex flex-col items-center justify-center">
            <h2 className="my-4 text-2xl font-bold">Tenzies</h2>
            <p>Roll untill all dice are the same. Click each die to freeze it at its current value between rolls</p> 
          </div>
          <div className='flex items-center justify-center text-6xl'>
            <h2>{props.seconds}</h2>
          </div>
          <div className="grid grid-cols-5">
            {props.diceElement}
          </div>
          <div className="flex items-center justify-center py-4">
            <button
              onClick={props.handleRoll} 
              className="bg-[#5035FF] px-10 py-2 rounded-md font-bold text-white"
            >
              Roll
            </button>
          </div>
          <p className="font-bold">Rolls: {props.rolls}</p>
        </div>
      </main>
    </div>
  )
}

export default TimeAttack