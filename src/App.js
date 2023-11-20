import React from "react";

import Intro from "./components/Intro";
import ClassicMode from "./components/ClassicMode";
import TimeMode from "./components/TimeMode";

function App() {

  const [gameMode, setGameMode] = React.useState('')
  

  function handleClassic() {
    setGameMode('classic')
  }

  function handleTimeAttack() {
    setGameMode('time attack')
  }
    
  
  if (gameMode === '') {
    return (
      <Intro
        handleClassic = {handleClassic}
        handleTimeAttack = {handleTimeAttack}
      />
    )
  } else if (gameMode === 'classic') {
    return (
      <ClassicMode />        
    );
  } else {
    return (
      <TimeMode />
    )
  }
}

export default App;


