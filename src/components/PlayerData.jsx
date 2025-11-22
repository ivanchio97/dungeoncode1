import React, { useState, useContext } from 'react'
import coinImage from '../assets/coin.gif'
import heartImage from '../assets/heart.gif'
import '../styles/playerData.css'
import {Data} from '../contexts/DataProvider'


const PlayerData = ()=>{

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
      break;

      case 2:
        
        setDataPlayer(prev => ({
          ...prev,
          levelProgress: 4,
        }))
        alert("¡Item usado! Puedes abrir la puerta")
        
      break;
      
      case 3:
        setDataPlayer(prev => ({
          ...prev,
          doubleChest: true
        }))
        alert("¡Item usado! El próximo cofre contendrá el doble de monedas ")
      break;

      case 4:
        setDataPlayer(prev => ({
          ...prev,
          bow: true
        }))
        alert("Selecciona un slime para eliminarlo! (No funciona con jefes ni obtendrás monedas por ello)")
        //en la room, en la funcion deleteSlime puedo ocultar setShowCodeModal
      break;

      case 5:
        
        setDataPlayer(prev => ({
          ...prev,
          eventChance: prev.eventChance + 5
        }))
        alert("¡Item usado! ¡Ahora es más común encontrar eventos!")
      break;
    }
    filtrarItem(item)
  }

  const {dataPlayer, setDataPlayer} = useContext(Data)
  return (
    <div className='player-data'>

      <div className='profile-photo'>{dataPlayer.icon}</div>
      <div>
        <div className='data-distribution'>
          <img src={coinImage} alt="" className='player-data-img' />
          <h3> × {dataPlayer.coins}</h3>
        </div>
        <div className='data-distribution'>
          <img src={heartImage} alt="" className='player-data-img' />
          <h3> × {dataPlayer.lives} </h3>
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