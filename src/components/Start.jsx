import React from 'react'

const Start = (props) => {
  return (
    <div className='md:w-[450px] w-full bg-[#0B2434] p-4 md:my-24 h-screen md:h-[450px]'>
          <div className="w-full bg-[#f5f5f5] h-[100%] rounded-md flex justify-center items-center flex-col px-10">
            <h1 className="text-3xl font-bold">Tenzies</h1>
            <h2 className="m-4 text-xl font-bold">Want to test your luck?</h2>
            <p>Your goal is to get all the dice to hold the same number in the smallest possible rolls.</p>
            <p className="my-2">Click the button below to start the game and roll, Click each die to freeze it at its current value between rolls</p>
            <button 
                className='bg-[#5035FF] px-10 py-2 rounded-md font-bold text-white my-2' 
                onClick={props.startGame}
            >
                Start Game
            </button>
          </div>
        </div>
  )
}

export default Start