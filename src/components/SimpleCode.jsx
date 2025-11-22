import React, {useState, useContext} from 'react'
import {Data} from '../contexts/DataProvider'
import confetti from 'canvas-confetti'
import {toast} from 'react-toastify'
import '../styles/CodeModal.css'

const SimpleCode = ({show,setShow}) =>{

  const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const frutas = [
  "manzana", "banana", "naranja", "pera", "uva", "mango", "fresa",
  "melon", "sandia", "kiwi", "durazno", "cereza", "ciruela",
  "frambuesa", "arandano", "papaya", "guayaba", "mandarina", "lima", "granada"
  ];
  const {dataPlayer, setDataPlayer} = useContext(Data)
  const [ran1, setRan1] = useState(Math.floor(Math.random()*20))
  const [ran2, setRan2] = useState(Math.floor(Math.random()*20))
  const [var1, setVar1] = useState(frutas[ran1])
  const [var2, setVar2] = useState(letters[ran2]) 
  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")
  const [showCodeModal, setShowCodeModal] = useState(show)

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
    const respuesta1 = `${var1}=${ran2}`
    const respuesta2 = `print(${var1})`
   if(input1.replace(/\s/g, '') == respuesta1.replace(/\s/g, '') 
      && input2.replace(/\s/g, '') == respuesta2.replace(/\s/g, '')  )
    {
    
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
      <h4 className='instructions' >Escribe el código necesario para crear una variable
        llamada <strong className='total'>{var1}</strong> que tenga el valor de 
        <strong className='total'> {ran2}.</strong>
      </h4>
      <input type="text" placeholder='Escribe aquí' className='input-long'
             value={input1} onChange={(e)=>setInput1(e.target.value)}
      />
      <h4 className='instructions'>
        Escribe el código necesario para mostrar el valor de la variable en pantalla.
      </h4>
      <input type="text" className='input-long' placeholder='Escribe aquí'
             value={input2} onChange={(e)=>setInput2(e.target.value)}
      />
      <div className='espacio'></div>
      <button className='try-button' onClick={()=>handleClick()}>Intentar</button>
    </div>
  )
}
export default SimpleCode