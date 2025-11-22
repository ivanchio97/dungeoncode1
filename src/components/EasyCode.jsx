import React, {useState, useContext} from 'react'
import {Data} from '../contexts/DataProvider'
import confetti from 'canvas-confetti'
import {toast} from 'react-toastify'

const EasyCode = ({show,setShow}) =>{

  const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const operators = ['+','-','*','/']
  const ran1 = Math.floor(Math.random()*26)
  const ran2 = Math.floor(Math.random()*26)
  const ran3 = Math.floor(Math.random()*2)
  const [var1, setVar1] = useState(letters[ran1])
  const [var2, setVar2] = useState(letters[ran2])
  const [varOp, setVarOp] = useState(operators[ran3])
  const [total, setTotal] = useState(Math.floor(Math.random()*100)+5)
  const {dataPlayer, setDataPlayer} = useContext(Data)
  const [input1, setInput1] = useState(0)
  const [input2, setInput2] = useState(0)
  const [showCodeModal, setShowCodeModal] = useState(show)
  const [keys, setKeys] = useState(0)

  function lanzarError(){
    const Shape1 = confetti.shapeFromText({ text: "❌", scalar: 4 })
    const Shape2 = confetti.shapeFromText({ text: "😡", scalar: 4 })
    confetti({
      particleCount: 30,
      spread:70,
      origin: {y: 0.6},
      shapes: [Shape1, Shape2],
      scalar: 4
    })
  }
  function lanzarConfetti(){
    confetti({
    particleCount: 100, 
    spread: 70,          
    origin: { y: 0.6 },  
  });
  }
  const handleClick = () =>{
    let calc = 0;
    switch(varOp){
      case '+':
        calc = Number(input1) + Number(input2);
      break;

      case '-':
        calc = Number(input1) - Number(input2);
      break;

      case '/':
        calc = Number(input1) / Number(input2);
      break;

      case '*':
        calc = Number(input1) * Number(input2);
      break;
    }

    if(total == calc){
      toast.success("¡Has derrotado al slime y ganaste 5 monedas! 😎",{
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "colored"
      })
      lanzarConfetti();
      setDataPlayer((prev) => ({
        ...prev,
        coins: prev.coins + 5,
        levelProgress: prev.levelProgress + 1
      }))
      setShow(false)
    }
    else{
      lanzarError();

      toast.error("¡Oh no!, ¡El slime te ha atacado!. Has perdido una vida 😭",{
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "colored"
      })

      setDataPlayer((prev) => ({
        ...prev,
        lives: prev.lives - 1
      }))
    }
    setShowCodeModal(false);
  }

  return (
    <div className='code'>
      <h4 className='instructions' >Completa el código para que en <br/> pantalla se muestre el valor de <strong className='total' >{total}</strong></h4>
      <div><p>{var1}</p>=<input className='input-short' type='number' onChange={(e)=>setInput1(e.target.value)} value={input1} /></div>
      <div><p>{var2}</p>=<input className='input-short' type = 'number' onChange={(e)=>setInput2(e.target.value)} value={input2} /></div>
      <div><p>total</p>=<p>{var1}</p><p className='operator'>{varOp}</p><p>{var2}</p></div>
      <div><p className='print'>print</p>(total)</div>
      <button className='try-button' onClick={()=>{handleClick()}}>Intentar</button>
    </div>
  )
}
export default EasyCode