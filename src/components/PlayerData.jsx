import React, { useState, useContext } from 'react'
import coinImage from '../assets/coin.gif'
import heartImage from '../assets/heart.gif'
import '../styles/playerData.css'
import {Data} from '../contexts/DataProvider'
import { useNavigate } from 'react-router-dom'
import GameOver from './GameOver'


const PlayerData = ()=>{

  const navigate = useNavigate()

  function filtrarItem(item){
    const filtered = dataPlayer.inventory.filter((i)=> i.uid != item.uid )
    setDataPlayer(prev => ({
      ...prev,
      inventory: filtered
    }))
  }

  function useItem(item){
    switch(item.id){
      case 1:
        setDataPlayer(prev => ({
          ...prev,
          lives: prev.lives + 1
        }))
        alert("¡Item usado! ¡Tienes una vida más!")
        filtrarItem(item)
      break;

      case 2:
        
        setDataPlayer(prev => ({
          ...prev,
          levelProgress: 4,
        }))
        alert("¡Item usado! Puedes abrir la puerta")
        filtrarItem(item)
      break;
      
      case 3:
        setDataPlayer(prev => ({
          ...prev,
          doubleChest: true
        }))
        alert("¡Item usado! El próximo cofre contendrá el doble de monedas ")
        filtrarItem(item)
      break;

      case 4:
        setDataPlayer(prev => ({
          ...prev,
          bow: true
        }))
        alert("Selecciona un slime para eliminarlo! (No funciona con jefes ni obtendrás monedas por ello)")
        filtrarItem(item)
      break;

      case 5:
        
        setDataPlayer(prev => ({
          ...prev,
          eventChance: prev.eventChance + 5
        }))
        alert("¡Item usado! ¡Ahora es más común encontrar eventos!")
        filtrarItem(item)
      break;

      case 6:
        if(dataPlayer.shop < 2){
          alert("No necesitas bajar más el numero. !La próxima sala ya es la tienda!")
        }
        else{
          setDataPlayer(prev=>({
          ...prev,
          shop: prev.shop-1
        }))
        alert("¡Item usado! La tienda está más cerca ahora!")
        filtrarItem(item)
        }
      break;
      case 7:
        alert("¡Item usado! Viajando hacia el portal...")
        navigate('/event4')
        filtrarItem(item)
      break;
      case 8:
        alert("¡Item usado! Viajando hacia la tienda...")
        navigate('/shop')
        filtrarItem(item)
      break;
      case 9:
        alert("😸")
        navigate('/catShop')
        filtrarItem(item)
      break;

      case 101:
        setDataPlayer(prev => ({
          ...prev,
          coins: prev.coins + 50
        }))
        alert("¡Item usado! Obtuviste 50 monedas")
        filtrarItem(item)
      break;

      case 102:
        setDataPlayer(prev => {
          const newKeys = [
            {
              id: 2, nombre: "Llave", icono: "🔑", costo: 50, desc: "Puedes abrir cualquier puerta", compra: true,
              uid: crypto.randomUUID()
            },
            {
              id: 2, nombre: "Llave", icono: "🔑", costo: 50, desc: "Puedes abrir cualquier puerta", compra: true,
              uid: crypto.randomUUID()
            }
          ]

          const filtered = prev.inventory.filter(i => i.uid !== item.uid)

          return {
            ...prev,
            inventory: [...filtered, ...newKeys]
          }
        })
        
        alert("¡Item usado! Se han agregado dos llaves a tu inventario")
      break;
      case 103:
        setDataPlayer(prev => ({
          ...prev,
          coins: prev.coins * 2
        }))
        alert("¡Item usado! ¡Se han duplicado tus monedas!")
        filtrarItem(item)
      break;

    }
    
  }

  const {dataPlayer, setDataPlayer} = useContext(Data)
  return (
    <div className='player-data'>
      { dataPlayer.lives < 1 ?  <  GameOver /> : <></> }
      <div className='profile-photo'>{dataPlayer.icon}</div>
      <div>
        <div className='data-distribution'>
          <img src={coinImage} alt="" className='player-data-img' />
          <h3> {"x"} {dataPlayer.coins}</h3>
        </div>
        <div className='data-distribution'>
          <img src={heartImage} alt="" className='player-data-img' />
          <h3> {"x"} {dataPlayer.lives} </h3>
        </div>
      </div>
      <div className='inventory'>
        {
          dataPlayer.inventory.map((item)=>{
            return(
              <div className='product' onClick={()=>useItem(item)} >
                {item.icono}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default PlayerData