import React, {createContext, useContext, useState} from 'react'

export const Data = createContext(null)

export const DataProvider = ({children}) =>{

  const newGame = {
    icon: "🍕",
    lives: 3,
    coins: 0,
    levelProgress: 0,
    level: 1,
    chest: true,
    doubleChest: false,
    actualEnemy:0,
    eventChance: 20,
    inventory: [],
    bow: false,
    misteriousEvent : 0,
    shop: 4
  }

  const [dataPlayer, setDataPlayer] = useState(newGame)

  return(
    <Data.Provider value={{ dataPlayer,setDataPlayer }} >{children}</Data.Provider>
  )
}