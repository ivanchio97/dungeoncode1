import React, { createContext,useState } from 'react';

export const SlimeData = createContext(null);

export const SlimeProvider = ({children}) => {

  const newSlimeRoom = [true, true, true, true];

  const [slimeStates, setSlimeStates] = useState(newSlimeRoom)

  return(
    <SlimeData.Provider value={[slimeStates, setSlimeStates]} >{children}</SlimeData.Provider>
  )
}