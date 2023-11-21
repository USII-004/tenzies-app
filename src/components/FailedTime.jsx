import React from 'react'

const FailedTime = (props) => {
  return (
    <main className="md:w-[450px] w-full bg-[#0B2434] p-4 md:my-24 h-screen md:h-[450px]">
      <div className="w-full bg-[#f5f5f5] h-[100%] rounded-md flex justify-center items-center flex-col px-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="my-4 text-2xl font-bold">SORRY!!</h2>
          <p>Too bad, you were unable to finsh the game on time</p>
          <p>Try again</p>
        </div>
        <div className='my-4'>
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

export default FailedTime