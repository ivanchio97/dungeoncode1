import React, {createContext, useContext, useState} from 'react'

export const Data = createContext(null)

export const DataProvider = ({children}) =>{

  const developerMode = [
    { id: 2, nombre: "Llave", icono: "🔑", costo: 50, desc: "Puedes abrir cualquier puerta", compra: true, uid: crypto.randomUUID() },
    { id: 2, nombre: "Llave", icono: "🔑", costo: 50, desc: "Puedes abrir cualquier puerta", compra: true, uid: crypto.randomUUID() },
    { id: 2, nombre: "Llave", icono: "🔑", costo: 50, desc: "Puedes abrir cualquier puerta", compra: true, uid: crypto.randomUUID() },
    { id: 2, nombre: "Llave", icono: "🔑", costo: 50, desc: "Puedes abrir cualquier puerta", compra: true, uid: crypto.randomUUID() },
    { id: 2, nombre: "Llave", icono: "🔑", costo: 50, desc: "Puedes abrir cualquier puerta", compra: true, uid: crypto.randomUUID() },
    { id: 2, nombre: "Llave", icono: "🔑", costo: 50, desc: "Puedes abrir cualquier puerta", compra: true, uid: crypto.randomUUID() },
    { id: 2, nombre: "Llave", icono: "🔑", costo: 50, desc: "Puedes abrir cualquier puerta", compra: true, uid: crypto.randomUUID() },
    { id: 2, nombre: "Llave", icono: "🔑", costo: 50, desc: "Puedes abrir cualquier puerta", compra: true, uid: crypto.randomUUID() },
  ]

  const newGame = {
    icon: "🍕",
    lives: 3,
    coins: 200,
    levelProgress: 0,
    level: 1,
    chest: true,
    doubleChest: false,
    actualEnemy:0,
    eventChance: 50,
    inventory: [],
    bow: false,
    misteriousEvent : 0,
    shop: 4,
    coinsCode: "X7S9ASH2190"
  }

  const [dataPlayer, setDataPlayer] = useState(newGame)

  return(
    <Data.Provider value={{ dataPlayer,setDataPlayer }} >{children}</Data.Provider>
  )
}