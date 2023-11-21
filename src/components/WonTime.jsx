import React from 'react'
import Confetti from 'react-confetti'


const WonTime = (props) => {
  return (
    <main className="md:w-[450px] w-full bg-[#0B2434] p-4 md:my-24 h-screen md:h-[450px]">
      {props.tenzies && <Confetti />}
      <div className="w-full bg-[#f5f5f5] h-[100%] rounded-md flex justify-center items-center flex-col px-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="my-4 text-2xl font-bold">HURRAY!!</h2>
          <p>Congratulations, on completing the game and beating the time</p>
        </div>
        <div className="flex flex-col items-center justify-center py-4">
          <p className='text-xl font-bold'>Number of Rolls: {props.rolls}</p>
          <p className='my-4 text-xl font-bold'>Time: {30 - props.seconds} seconds</p>
        </div> 
        <div>
          <button
            onClick={props.handleReset} 
            className="bg-[#5035FF] px-10 py-2 rounded-md font-bold text-white"
          >
            New Game
          </button>
        </div>
      </div>
    </main>
  )
}

export default WonTime