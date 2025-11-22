import React, { useContext, useState } from 'react'
import '../styles/Menu.css'
import logo from '../assets/logo.png'
import { SlArrowLeftCircle } from "react-icons/sl";
import { SlArrowRightCircle } from "react-icons/sl";
import { Data } from '../contexts/DataProvider';
import { useNavigate } from 'react-router-dom';

const Menu = ()=>{
  const navigate = useNavigate()
  const {dataPlayer, setDataPlayer} = useContext(Data)
  const template_emoji = [
    "😎","🤣", "😴", "🤑", "😡", "🤠", "🤡", "💙",
    "💔","🐧","🙊", "😘","🍩","🦝","😍","👻","🦆"
  ]
  const [controller, setController] = useState(0)
  const [usuario, setUsuario] = useState("")

  function change (num){
    if(num == 1){
      setController(prev => prev - 1)
      if(controller < 1) setController(template_emoji.length-1)
    }
    else{
      setController(prev => prev + 1)
      if(controller > template_emoji.length-2) setController(0)
    }
  }
  function play(){
    setDataPlayer((prev) => ({
        ...prev,
        icon: template_emoji[controller]
      }))
    navigate("/game")
  }

  return(
    <div className='menu'>
      <img src={logo} alt="logo" className='menu-logo' />
      <div className='divisor'>
        <div className='selector' >
          <SlArrowLeftCircle className='left-arrow' onClick={()=>change(1)} />
          {template_emoji[controller]}
          <SlArrowRightCircle className='right-arrow' onClick={()=>change(2)} />
        </div>
        <input type="text" placeholder='Escribe tu nombre' />
        <button onClick={()=>play()}  >Nueva partida</button>
      </div>

    </div>
  )
}
export default Menu