import React, { useContext, useState } from 'react'
import dolar from '../assets/dollar.png'
import '../styles/Advicer.css'
import { Data } from '../contexts/DataProvider'

const Advicer = () => {

  const {dataPlayer, setDataPlayer} = useContext(Data)

  return (
    <div className='adviser'>
      <p className='text'>Tienda a...</p>
      <img src={dolar} alt="" />
      <div className='number'>{dataPlayer.shop}</div>
    </div>
  )
}

export default Advicer
