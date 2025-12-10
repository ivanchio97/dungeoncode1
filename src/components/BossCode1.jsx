import React, {useState, useContext, useEffect} from 'react'
import {Data} from '../contexts/DataProvider'
import confetti from 'canvas-confetti'
import {toast} from 'react-toastify'
import '../styles/CodeModal.css'
import {preguntasBoss} from '../views/bosses/preguntasBoss'

const BossCode1 = ({show,setShow}) =>{


  const [input, setInput] = useState("")
  const [question, setQuestion] = useState("")
  const [number, setNumber] = useState(0)

  useEffect(()=>{
    const random = Math.floor(Math.random()*preguntasBoss.preguntas.length)
    setNumber(random)
    setQuestion(preguntasBoss.preguntas[random])
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
    function showToast(message, type){
      if(type == "success"){
        toast.success(message, {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        theme: 'colored'
        });
      }
      else if( type == "error"){
        toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        theme: 'colored'
        });
      }
    }

  const handleClick = () =>{
    if(input != ""){
      const search = preguntasBoss.respuestas[number].includes(input)
      if(search){
        lanzarConfetti()
        setShow(false)
        showToast("!Correcto! Has ganado 10 monedas! 🤩","success")
      }
      else{
        lanzarError()
        showToast("Incorrecto! El slime te ha atacado! 😥 ","error")
      }
      }

  }

  return (
    <div className='code-modal'>
      <div className='code'>
        <h4 className='instructions' >
          ¡El jefe te hace desafía!
        </h4>
        <div>{question}</div>
        <input type="text" placeholder='Escribe aquí' className='input-long'
              value={input} onChange={(e)=>setInput(e.target.value)}
        />
        <button className='try-button' onClick={()=>handleClick()}>Intentar</button>
      </div>
    </div>
  )
}
export default BossCode1