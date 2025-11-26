import React,{useContext, useEffect, useState} from 'react'
import '../../styles/StringsEvent.css'
import PlayerData from '../../components/PlayerData'
import { Data } from '../../contexts/DataProvider'
import { useNavigate } from 'react-router-dom'

const StringsEvent = () => {
 const navigate = useNavigate()
 const [strings, setStrings] = useState([
  {name: "1L", selected: false},
  {name: "5C", selected: false},
  {name: "20C", selected: false},
  {name: "lost", selected: false}
])
 const [premio, setPremio] = useState("?")
 const [conteo, setConteo] = useState(2)
 const {dataPlayer, setDataPlayer} = useContext(Data)
 const [perdiste, setPerdiste] = useState(false)
 const [mensaje, setMensaje] = useState("")
 function shuffle(array) {
  const arr = [...array]; // copia para no mutar
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

 useEffect(()=>{
    setStrings(shuffle(strings))
 },[])

 function choose(item, ind){
  let copy = []
   switch(item.name){
    case "1L":
     setPremio("¡Ganaste 💖 x 1!");
     copy = [...strings];
     copy[ind].selected = true;
     checador()
     setDataPlayer(prev=>({
      ...prev,
      lives: prev.lives + 1
     }))
    break;

    case "5C":
     setPremio("¡Ganaste  5 monedas 😁!")
     copy = [...strings];
     copy[ind].selected = true;
     checador()
     setDataPlayer(prev=>({
      ...prev,
      coins: prev.coins + 5
     }))
    break;

    case "20C":
     setPremio("¡Ganaste 20 monedas! 😱😎")
     copy = [...strings];
     copy[ind].selected = true;
     checador()
     setDataPlayer(prev=>({
      ...prev,
      coins: prev.coins + 20
     }))
    break;

    case "lost":
     alert("¡El cubo explotó!")
     setPremio("Perdiste una vida 😭")
     setMensaje("La explosión del cubo te deja mal herido. Es mejor que continues...")
     setPerdiste(true)
     setDataPlayer(prev=>({
      ...prev,
      lives: prev.lives - 1
     }))
    break;
   }
 }
 function go(){
  navigate('/game')
 }
 function checador(){
  setConteo(prev => prev + 1)
  if(conteo > 3){

    setMensaje("¡Acertaste todos los cubos! ¿Suerte?, ¿Destino?...")
    setPerdiste(true)
    
  }

 }

  return (
    <div className='strings-event'>
      <PlayerData />
      <h1>No abras el cubo incorrecto!</h1>
      <div className='premio'>{premio}</div>
      { !perdiste ? (
        <div className='cuadros'>
        {
          strings.map((item,ind)=>{
            return(
              <>
               { !item.selected && <div className='cuadro' onClick={()=>choose(item,ind)} >
                    {ind+1}
                </div> 
               }
              </>
            )
          })
        }
      </div>) : <div className='info2'>
          <h3>{mensaje}</h3>
         <div className='options2'><button onClick={go}>Seguir</button> </div>
      </div>
      }
    </div>
  )
}

export default StringsEvent
