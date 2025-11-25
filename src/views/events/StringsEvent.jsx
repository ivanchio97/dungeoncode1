import React,{useContext, useEffect, useState} from 'react'
import '../../styles/StringsEvent.css'
import PlayerData from '../../components/PlayerData'
import { Data } from '../../contexts/DataProvider'

const StringsEvent = () => {

 const [strings, setStrings] = useState(["1L","5C","20C","lost"])
 const [premio, setPremio] = useState("?")
 const {dataPlayer, setDataPlayer} = useContext(Data)
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

 function choose(item){
   switch(item){
    case "1L":
     setPremio("¡Ganaste 💖 x 1!")
    break;

    case "5C":
     setPremio("¡Ganaste  5 monedas 😁!")
    break;

    case "20C":
     setPremio("¡Ganaste 20 monedas! 😱😎")
    break;

    case "lost":
     alert("¡El cubo explotó!")
     setPremio("Perdiste una vida 😭")
    break;
   }
 }

  return (
    <div className='strings-event'>
      <PlayerData />
      <h1>No abras el cubo incorrecto!</h1>
      <div className='premio'>{premio}</div>
      <div className='cuadros'>
        {
          strings.map((item)=>{
            return(
                <div className='cuadro' onClick={()=>choose(item)}>
                    ?
                </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default StringsEvent
