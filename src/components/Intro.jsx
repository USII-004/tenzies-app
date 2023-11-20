import React from 'react'

const Intro = (props) => {
  return (
    <div className='md:w-[450px] w-full bg-[#0B2434] p-4 md:my-24 h-screen md:h-[450px]'>
        <div className="w-full bg-[#f5f5f5] h-[100%] rounded-md flex justify-center items-center flex-col px-10">
          <h2 className="my-2 text-2xl font-bold">Welcome to Tenzies</h2>
          <p className="font-bold">Do pick your game mode</p>
          <p className="my-2">Select classic mode to learn about the game and play with no rules.</p>
          <p>Select time attack mode if you are ready for some real challenge to race against time.</p>
          <button 
                className='bg-[#5035FF] px-10 py-2 rounded-md font-bold text-white my-2' 
                onClick={props.handleClassic}
            >
                Classic Mode
            </button>
            <button 
                className='bg-[#5035FF] px-10 py-2 rounded-md font-bold text-white my-2' 
                onClick={props.handleTimeAttack}
            >
                Time Attack
            </button>
        </div>
      </div>
  )
}

export default Intro