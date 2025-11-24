import React, { useContext, useState } from 'react'
import '../styles/EventRoom.css'
import event1 from '../assets/evento1.jfif'
import PlayerData from '../components/PlayerData'
import EventBanner from '../components/EventBanner'
import { Data } from '../contexts/DataProvider'
import { useNavigate } from 'react-router-dom'

const EventRoom = () => {

  const { dataPlayer, setDataPlayer } = useContext(Data)

  const navigate = useNavigate()
  const [contenido, setContenido] = useState(null)

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
      setContenido(mensaje)
    }
  }
  function go(){
    navigate("/game")
  }

  return (
    <div className='level3'>
      <PlayerData />

      <div className='event'>
        
        {/* Banner siempre visible */}
        <EventBanner
          title="El hombre misterioso"
          top={110}
          left={470}
          scale={0.7}
        />

        {/* Imagen siempre visible */}
        <img src={event1} alt="" />

        {/* Aquí es donde se sustituye SOLO la parte narrativa */}
        {contenido ? (
          contenido
        ) : (
          <div className='info'>
            <h3>
              Cruzas la puerta y te encuentras con un hombre misterioso... <br />
              <strong>
                ¡Hola aventurero! Me he perdido en el laberinto,
                quiero comprar una Llave 🙁 <br />
                ¿Me regalas 10 monedas?
              </strong>
            </h3>

            <div className='options'>
              <button onClick={() => response("yes")}>
                <span className='yes'>¡Claro!</span> - Dar 10 monedas
              </button>

              <button onClick={() => response("no")}>
                <span className='no'>¡No tengo!</span> - Huir
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default EventRoom
