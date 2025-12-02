import React, {useState, useContext, useEffect} from 'react'
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
  const [total, setTotal] = useState(Math.floor(Math.random()*100)+20)
  const {dataPlayer, setDataPlayer} = useContext(Data)
  const [input2, setInput2] = useState(0)
  const [showCodeModal, setShowCodeModal] = useState(show)
  const [valor2, setValor2] = useState(Math.floor(Math.random()*100)+4)
  const [valor1, setValor1] = useState(Math.floor(Math.random()*20)+2)

  useEffect(()=>{
    if(varOp == "+"){
      setTotal(valor2 + valor1)
    }
    else if(varOp == "-"){
      setTotal(valor2 - valor1)
    }
    else if(varOp == "*"){
      setTotal(valor2 * valor1)
    }
    else if(varOp == "/"){
      setTotal(valor2 / valor1)
    }

  },[])

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
        calc = Number(valor2) + Number(input2);
      break;

      case '-':
        calc = Number(valor2) - Number(input2);
      break;

      case '/':
        calc = Number(valor2) / Number(input2);
      break;

      case '*':
        calc = Number(valor2) * Number(input2);
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
      <div><p>{var1}</p>= <p>{valor2}</p> </div>
      <div><p>{var2}</p>=<input className='input-short' type = 'number' onChange={(e)=>setInput2(e.target.value)} value={input2} /></div>
      <div><p>total</p>=<p>{var1}</p><p className='operator'>{varOp}</p><p>{var2}</p></div>
      <div><p className='print'>print</p>(total)</div>
      <button className='try-button' onClick={()=>{handleClick()}}>Intentar</button>
    </div>
  )
}
export default EasyCode