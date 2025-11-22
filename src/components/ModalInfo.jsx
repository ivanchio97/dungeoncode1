import React, { useContext, useState } from 'react'
import '../styles/ModalInfo.css'
import { Data } from '../contexts/DataProvider'


const ModalInfo = ({show, setShow}) => {
    const {dataPlayer, setDataPlayer} = useContext(Data)
    const [prize, setPrize] = useState(Math.floor(Math.random()*15) + 1)
    function recoger(){
      if(dataPlayer.doubleChest == true){
        setDataPlayer(prev => ({
          ...prev,
          coins: prev.coins + (prize * 2),
          doubleChest: false
        }))
      }
      else{
        setDataPlayer(prev => ({
          ...prev,
          coins: prev.coins + prize
        }))
      }
      setShow(false)
    }
  return (
    <>
        <div className='modal-info'>
            <h2>¡Has encontrado {dataPlayer.doubleChest ? <p>{prize} <strong className='gold'> x 2</strong> </p> : <p>{prize}</p> } monedas!</h2>
            <button className='try-button' onClick={recoger}>Recoger</button>
        </div>
        <button className='close-btn2' onClick={()=>setShow(false)}>X</button>
    </>
  )
}

export default ModalInfo
