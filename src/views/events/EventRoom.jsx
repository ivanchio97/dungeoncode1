import React, { useContext, useEffect, useState } from 'react'
import '../../styles/EventRoom.css'
import event1 from '../../assets/evento1.jfif'
import PlayerData from '../../components/PlayerData'
import EventBanner from '../../components/EventBanner'
import { Data } from '../../contexts/DataProvider'
import { useNavigate } from 'react-router-dom'

const EventRoom = () => {

  useEffect(()=>{
    if(dataPlayer.misteriousEvent > 1 &&  dataPlayer.misteriousEvent < 20){
      setMessage("Hola, sigo perdido y un slime me atacó 😭😔 ")
      setQuestion("De nuevo, ¿Me regalarías 10 monedas?")
    }
    else if(dataPlayer.misteriousEvent > 19){
      const code = Math.floor(Math.random()*10000) + 21927
      setDataPlayer(prev => ({
        ...prev,
        coinsCode: code
      }))
      setMessage("¡Holaaa! He encontrado una máquina y usando las monedas que me regalaste, me dió un código. No entiendo que significa... ")
      setQuestion(`El código es: ${code} `)
    }

  },[])

  const { dataPlayer, setDataPlayer } = useContext(Data)
  const navigate = useNavigate()
  const [contenido, setContenido] = useState(null)
  const [message, setMessage] = useState("¡Hola aventurero! Me he perdido en el laberinto, quiero comprar una Llave 🙁")
  const [question, setQuestion] = useState("¿Me regalas 10 monedas?")

  const mensaje = (
    <div className='info2'>
      <h3>El hombre sonríe y se va corriendo.</h3>
      <div className="options">
        <button onClick={go} >Ir a la siguiente sala</button>
      </div>
    </div>
  )

  function response(answer) {
    if (answer === "yes" && dataPlayer.coins >= 10) {
      setDataPlayer(prev => ({
        ...prev,
        coins: prev.coins - 10,
        misteriousEvent: prev.misteriousEvent + 10
      }))
      setContenido(mensaje)
    }
    else if (answer === "yes" && dataPlayer.coins < 10) {
      alert("No tienes suficientes monedas!")
    }
    else {
      setDataPlayer(prev => ({
        ...prev,
        misteriousEvent: prev.misteriousEvent + 1
      }))
      setContenido(mensaje)
    }
  }
  function go(){
    navigate("/game")
  }
  function resetEvent(){
    navigate("/game")
    setDataPlayer(prev=>({
      ...prev,
      misteriousEvent:0
    }))
  }

  return (
    <div className='level3'>
      <PlayerData />

      <div className='event'>
        
        
        <EventBanner
          title="El hombre misterioso"
          top={110}
          left={470}
          scale={0.7}
        />

        
        <img src={event1} alt="" />

        {/* Aquí es donde se sustituye SOLO la parte narrativa */}
        {contenido ? (
          contenido
        ) : (
          <div className='info'>
            <h3>
              Cruzas la puerta y te encuentras con un hombre misterioso... <br />
              <strong>
                {message} <br />
                {question}
              </strong>
            </h3>
          { dataPlayer.misteriousEvent < 19 ? (
            <div className='options'>
              <button onClick={() => response("yes")}>
                <span className='yes'>¡Claro!</span> - Dar 10 monedas
              </button>

              <button onClick={() => response("no")}>
                <span className='no'>¡No tengo!</span> - Huir
              </button>
            </div>
            ) : (
              <div className='options'>
                <button onClick={() => resetEvent()}>
                  <span className='yes'>¡Gracias!</span> 
              </button>
              </div>
            )
          }
          </div>
        )}

      </div>
    </div>
  )
}

export default EventRoom
