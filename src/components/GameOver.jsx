import React, { useContext } from 'react'
import '../styles/GameOver.css'
import { Data } from '../contexts/DataProvider'
import { useNavigate } from 'react-router-dom'

const GameOver = () => {

    const {dataPlayer, setDataPlayer} = useContext(Data)
    const navigate = useNavigate()
    function reset(){
        setDataPlayer({
            icon: "🍕",
            lives: 3,
            coins: 0,
            levelProgress: 0,
            level: 1,
            chest: true,
            doubleChest: false,
            actualEnemy:0,
            eventChance: 30,
            inventory: [],
            bow: false,
            misteriousEvent : 0
        })
        navigate('/')
    }

  return ( 
    <div className='modal'>
        <div className='window'>
            <h1>¡Haz perdido!</h1>
            <button className='try-button2' onClick={reset}>Volver a jugar</button>
        </div>
    </div>
  )
}

export default GameOver
