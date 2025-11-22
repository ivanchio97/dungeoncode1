import React, { act, useContext, useEffect, useState } from 'react'
import '../styles/CodeModal.css'
import EasyCode from '../components/EasyCode'
import MediumCode from '../components/MediumCode'
import { Data } from '../contexts/DataProvider'
import SimpleCode from '../components/SimpleCode'

const CodeModal = ({show,setShow}) =>{

  const {dataPlayer} = useContext(Data)
  const [showCodeModal, setShowCodeModal] = useState(show)
  const [actual, setActual] = useState(null)
  const closeModal = () =>{
    setShow(false);
  }
  useEffect(()=>{
    if(dataPlayer.actualEnemy == 1){
    setActual(<SimpleCode show = {show} setShow = {setShow} />)
    }
    else if(dataPlayer.actualEnemy == 2){
      setActual(<EasyCode show = {show} setShow = {setShow} />)
    }
    else if(dataPlayer.actualEnemy == 3){
      setActual(<MediumCode show = {show} setShow = {setShow} />)
    }
  },[dataPlayer.actualEnemy])

  return(
    <>
    <div className='code-modal'>
      {actual}
    </div>
    </>
  )
}
export default CodeModal