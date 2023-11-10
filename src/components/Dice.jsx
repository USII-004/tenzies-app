import React from 'react'

const Dice = (props) => {
  return (
    <div
      onClick={props.handleClick} 
      className={`flex justify-center items-center w-10 h-10 font-bold text-xl ${props.isHeld ? 'bg-[#59E391]' : 'bg-white'} shadow-md m-4 cursor-pointer`}
    >
      <h2>{props.value}</h2>
    </div>
  )
}

export default Dice