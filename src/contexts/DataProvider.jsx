import React, {createContext, useContext, useState} from 'react'

export const Data = createContext(null)

export const DataProvider = ({children}) =>{

  const newGame = {
    icon: "🍕",
    lives: 3,
    coins: 200,
    levelProgress: 0,
    level: 1,
    chest: true,
    doubleChest: false,
    actualEnemy:0,
    eventChance: 30,
    inventory: [],
    bow: false
  }

  const [dataPlayer, setDataPlayer] = useState(newGame)

  return(
    <Data.Provider value={{ dataPlayer,setDataPlayer }} >{children}</Data.Provider>
  )
}